// Khaotic4 サイト全体に Basic 認証（ID / パスワード）をかける。
//
// ID とパスワードは Vercel のダッシュボードで環境変数に設定する。リポジトリには書かない。
//   Settings → Environment Variables
//     SITE_USER      … ログインID
//     SITE_PASSWORD  … パスワード
//   （Production / Preview / Development すべてにチェックを入れる）
//
// 環境変数が未設定のときは「開いてしまう」より「閉じる」を選び、案内を出して止める。
//
// 【依存なしで動かしている】
// 以前は @vercel/functions の next() を使っていたが、そのために npm の依存が1つ増え、
// パッケージ側の "node >= 20" 要件にビルドが縛られていた。
// Vercel の middleware は「何も返さなければそのまま次へ進む」ので、next() は無くてよい。
// next() で付けていた X-Robots-Tag は vercel.json の headers に移した。

export const config = {
  // Vercel 内部のパス（_vercel/insights など）以外すべてに適用する
  matcher: '/((?!_vercel).*)',
};

const REALM = 'Khaotic4 Official Site';

function unauthorized(message) {
  return new Response(message, {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

// 長さの違いで早期に抜けない比較（気休め程度だが、やらない理由もない）
function equals(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export default function middleware(request) {
  const user = process.env.SITE_USER;
  const password = process.env.SITE_PASSWORD;

  if (!user || !password) {
    return new Response(
      'このサイトは認証設定が未完了です。Vercel の環境変数 SITE_USER / SITE_PASSWORD を設定してください。',
      { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } },
    );
  }

  const header = request.headers.get('authorization') || '';
  const [scheme, encoded] = header.split(' ');

  if (scheme === 'Basic' && encoded) {
    let decoded = '';
    try {
      // atob はバイト列を返すので、UTF-8 として読み直す（日本語のパスワード対策）
      const bytes = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
      decoded = new TextDecoder().decode(bytes);
    } catch {
      return unauthorized('Invalid credentials.');
    }
    const sep = decoded.indexOf(':');
    if (sep !== -1) {
      const inputUser = decoded.slice(0, sep);
      const inputPassword = decoded.slice(sep + 1);
      if (equals(inputUser, user) && equals(inputPassword, password)) {
        // 認証OK。何も返さずに抜けると、本来のファイルがそのまま配信される
        return;
      }
    }
  }

  return unauthorized('ID とパスワードを入力してください。');
}
