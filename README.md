# KhaoticFour — Khaotic4（アイドルプロジェクト）の制作物一式

カオスキャンプ2026 の企画16「アイドルプロジェクト」＝ **Khaotic4（カオティックフォー）** のための素材・知識基盤・公式サイト。
メンバーは 原 優ノ介（黄・リーダー）／加納 功喜（白）／清水 麟太郎（青）／紙谷 凛（ピンク）。
箱根合宿（8/12）時点の仮名は `khaos>`（カオスだいなり）、8/15 中間発表で「グループ名募集中」→ 8/16 に Khaotic4 に決定。

| パス | 中身 |
|---|---|
| `00_pic/` | **写真の原本**（随時追加）。`member/` `live/` `jackets/` などをこの下に置く。`before_debut` は HEIC のまま置いてよい。**`.gitignore` 済み — GitHub には上げない（ローカルのみ）** |
| `00_pic/jackets/` | **ジャケットの原本**（`01_filter.png` 〜 `10_khaos_1st_virtual_album.png`）。末尾の `-v2` `-v3` は作り直しの版数で、書き出し時に落ちる |
| `00_pic/interview_AI/` | ライブ後インタビューのイメージ（`all1/2`＝全体、`<member>1/2`＝個人） |
| `00_pic/debut_live/` | デビューライブのイメージ（`debut_live_01`〜）。元の `exec-<uuid>.png` から連番にリネーム済み |
| `00_music/` `00_movie/` | 音源・動画の原本。**サイトからは参照しない**（配信は YouTube 埋め込み）。`.gitignore` 済み |
| `knowledge/<氏名>.md` | **メンバー4人の知識基盤**。スキル・性格・エピソード・発言集（出典付き）。各項目に【site掲載可】／【内部参考のみ】タグ。**`.gitignore` 済み — GitHub には上げない（ローカルのみ）** |
| `site/` | **公式サイト**（静的HTML）。ページ構成は下の「サイトのページ構成」を参照 |
| `site/assets/` | サイト用に縮小した写真のコピー（原本は触らない）。`_assets_build.py` で再生成 |
| `../Khaotic4-orange-mask*.png` | ロゴ原本（明色地）。サイトでは `site/assets/logo_khaotic4_dark.png`（白抜き透過）を使う |

## 写真を追加したら

```bash
cd 2026/KhaoticFour/site
python3 _assets_build.py      # 00_pic/ → assets/ に書き出し（1600px 幅。ジャケットのみ 1200px。HEIC は sips で変換）
```

ファイル名は `pic_<サブフォルダ>_<元の名前>.jpg`。`00_pic/member` `00_pic/live` `00_pic/jackets` だけは
それぞれ `member_` `live_` `jacket_` の短い接頭辞になる（例: `jacket_01_filter.jpg`）。HTML から差し替えるだけでよい。

> **2026-08-20 に原本フォルダを `00_` 付きに改名した**（`pic/` → `00_pic/` など）。改名で ignore が外れて
> 原本 200MB が追跡対象に戻っていたので、`.gitignore` と `.vercelignore` に**新旧どちらの名前も**入れ直した。
> `_assets_build.py` の参照先も直してある。**新しい原本フォルダを作ったら、両方の ignore に足すこと。**
**書き出した `site/assets/` は追跡対象なので、忘れずにコミットする。**

## 画像の原本は git に入れない

**リポジトリに入れるのは `site/assets/` の書き出し済みファイルだけ**（画像は 1600px 幅。動画込みで約45MB）。
原本の `00_pic/` `00_music/` `00_movie/` とロゴ原本（`logo.png` `Khaotic4-orange-mask*.png`）は
`knowledge/` と同じく `.gitignore` 済みで、**このフォルダにローカルにだけ置いてある**（約196MB）。

- 原本が重く、GitHub の画面が `Cannot retrieve latest commit at this time.` を出しやすかったため
- サイトは原本を一切参照しない（すべて `site/assets/` 経由）。`.vercelignore` でも除外済み
- **別マシンでクローンしただけでは `_assets_build.py` は動かない**（原本が無いため）。
  原本が要るときはこのフォルダごとコピーする
- 履歴には過去に入れた原本が残っているので `.git` 自体は約165MB のまま。
  これを減らすには `git filter-repo` での履歴書き換え（force push）が要る

## トップの構成についての決めごと

2026-08-20 に、**トップの主役をアルバム『KHAOS』にした**（それまでは「カオティックFour」のMVだった）。
`album-khaos.html` を人に見せたい、という依頼による。

- `index.html` の `#release`（`<section class="release album">`）が『KHAOS』の紹介。
  左が大きいジャケット、右に説明・収録8曲のサムネ・ボタン。**一番のボタンは `album-khaos.html` へ。**
  CSSは `style.css` の `.release.album` 一式。**別のシングルを主役に戻すときは `album` クラスを外す**と元の16:9埋め込み版のレイアウトに戻る。
- TOP の DISCOGRAPHY（`#disc` の横スクロール）は**左から新しい順**。
  同じ日付の中はアルバムを先頭に、そのあとは収録順。日付を足したら並べ直すこと。
- ヘッダー・フッターの **Discography は `discography.html`**（全曲一覧）に向けている。
  `index.html#disc` はトップ内の抜粋なので、ナビからは直接指していない。

## トップの背景動画

TOP のヒーローは **H.264 の mp4 を自動再生・ループ**している（2026-08-20 に静止画スライドから変更）。

```bash
bash site/_build/hero_video.sh     # リポジトリのルートで。00_movie/ → site/assets/hero_*.mp4
```

| ファイル | 用途 | サイズ |
|---|---|---|
| `site/assets/hero_1280.mp4` | 768px 以上 | 約 7.4MB |
| `site/assets/hero_854.mp4` | 767px 以下 | 約 3.0MB |

- **原本（`00_movie/`）は HEVC(H.265) なので、そのまま貼ると Chrome / Firefox で再生できないことがある。**
  必ず上のスクリプトで H.264 に焼き直す。**GIF は使わない**（同じ長さで数十MB・256色・ハードウェア再生も効かない）。
- 中身は4本のクリップの 1.5〜9.5 秒を 0.8 秒のクロスフェードでつないだ **約29.6秒・音声なし**。
  前後は地の色 `#06070b` にフェードするので、**ループのつなぎ目は見えない**。
- **画像スライドは消していない。** 動画の下にそのまま残してあり、次のときは画像が出る（＝フォールバック）。
  - 動きを減らす設定（`prefers-reduced-motion`）
  - 省データモード（`navigator.connection.saveData`）
  - H.264 を再生できない環境／ブラウザに自動再生を拒否された場合（iOS の低電力モードなど）
- `?static` を付けると動画を読み込まない（検版・スクリーンショット用）。
- **`style.css` と `main.js` の読み込みには `?v=20260820` を付けてある。**
  ブラウザが古い `main.js` をキャッシュから使うと、HTML だけ新しくて動画が出ない、という状態になるため。
  **CSS か JS を直したら、この数字を全ページまとめて上げること。**

  ```bash
  cd site && sed -i "" "s/?v=20260820/?v=<新しい日付>/g" *.html
  ```
- タブが裏に回っているあいだは `pause()` する。
- **差し替えるときは `00_movie/` の4本を入れ替えてスクリプトを再実行するだけ。** HTML は触らなくてよい。
  本数や尺を変えるなら、スクリプト内の `xfade` の `offset`（7.2 / 14.4 / 21.6）と
  `fade=t=out` の `st=29.0` を計算し直すこと。

## サイトのページ構成

**記事系は `stories.html` の1ページから入る**（2026-08-20 に統合）。
それまでヘッダーに Story / Interview / Report と3項目並んでいたのを、**Stories の1項目**にまとめた。
本文は3ページのまま残してあり、`stories.html` は入口の一覧だけを持つ。**記事が増えたらここにカードを足す。**

| ファイル | 中身 |
|---|---|
| `index.html` | TOP。ヒーロー／`#release`／NEWS／PROFILE／MEMBER／DISCOGRAPHY／MOVIE／SPECIAL |
| `discography.html` | **ディスコグラフィー全曲。** TOP の DISCOGRAPHY の「View all」とヘッダーの Discography はここへ |
| `profile.html` | メンバー4人の詳細。見出しは活動名（**YUNO / KOKI / RINTARO / RIN**）、本名は併記 |
| `stories.html` | **読みものの入口。** 結成秘話・インタビュー・投票企画レポートへの一覧 |
| `story.html` | 結成秘話（Stories から） |
| `interview.html` | デビュー記念ロングインタビュー（Stories から） |
| `oshi_vote.html` | 誰推し総選挙の企画レポート（Stories から） |
| `album-khaos.html` | デビュー前仮想アルバム『KHAOS』全8曲の収録曲ページ |
| `song-filter.html` `song-khaoticfour.html` | 楽曲ページ（歌詞・MV・クレジット） |
| `song-meccha-ii.html` `song-sorette-fuzei.html` `song-questioning.html` `song-smoky-mode.html` | ソロ4曲。歌詞・MV あり |
| `song-seisei.html` `song-filter-yuno.html` | カバー2曲。歌詞・MV あり |

### 表記のルール

- **活動名は大文字。YUNO / KOKI / RINTARO / RIN。**
  `YUNOSUKE` は使わない（2026-08-20 に `YUNO` へ統一）。
  本名の併記（`原 優ノ介 ／ Yunosuke Hara`）と、記事本文の地の文（原・加納・清水・紙谷）はそのまま。
- 綴りは `Khaos` / `Khaotic4`。

## サイトを見る

```bash
cd 2026/KhaoticFour/site && python3 -m http.server 8766
```

→ http://localhost:8766/ 。`?static` を付けると（例 `index.html?static`）フェード・スライドを止めて全部を即表示する（検版・スクショ用）。
`.claude/launch.json` の `khaotic4-site` からも起動できる。

## デザインについての注記（意図的な逸脱）

- **暗色地（#06070b）を使っている。** カオスキャンプのデザイン言語は「ダーク背景禁止」だが、
  本サイトは依頼により **starglow.tokyo（STARGLOW 公式）の構成・雰囲気を踏襲**している。
  Khaotic4 はキャンプの制作物というより学生企画のプロダクトなので、キャンプの生成り地には寄せていない。
  ブランドオレンジも使わず、色は4人のメンバーカラーのみ。**将来「生成りに直す」と誤修正しないこと。**
- STARGLOW からは**構成だけ**を借りている（ヒーロー動画＋下部ナビ／NEWS タブ／PROFILE 大判＋JP・EN／
  DISCOGRAPHY 横スクロール／MOVIE グリッド／分割文字見出し）。文章・画像・ロゴ・書体は一切流用していない。
  書体は Google Fonts（Archivo／Noto Sans JP／Shippori Mincho）。

## 公開時の注意

- サイトは **公開扱い**として書いている。学生（メンバー4人以外）の実名は載せていない。
  **講師については、本人の関与が事実として記事の中身になっている2名だけ実名で出している**（2026-08-20 に追加）。

  | 名前 | 出てくる場所 | 何をした人として書いているか |
  |---|---|---|
  | 川村元気さん | `story.html` `interview.html` `stories.html` | 「いまの時代に新しいアイドルをやるなら、AIだろうね」＝『フィルター』につながる原初のアイデアと、**グループ名 Khaotic4 の命名** |
  | 岡村P | 同上 | 箱根合宿の部屋での大激論に加わった |

  プロフィールの「岡村和佳菜賞」は賞名としてそのまま。**これ以外の講師・参加者の実名は増やさないこと。**
- **結成のきっかけは事実として書いている**：原が箱根合宿中に唐突に「アイドル、やらね？」と言い出したこと、
  その後に岡村Pを交えた合宿部屋での大激論があったこと、命名が川村元気さんであること。創作は周辺のやり取りだけ。
- `story.html` `interview.html` は **創作を含む**（奥付に明記）。事実の部分は `knowledge/` の【site掲載可】項目に基づく。
  インタビュー中の 紙谷「いい人から頼まれるようになる」／加納「どれだけ多くの人に届くか」は 1on1 由来（本人の前向きな言葉）。
  **本人が嫌がる可能性があるので、公開前に4人に一読してもらうこと。**
- **ディスコグラフィーは 2026-08-20 に実際の楽曲へ差し替えた。** ジャケットは全曲そろっている（CSS のダミーはもう使っていない）。

  | # | 曲 | 位置づけ | クレジット | ページ | 歌詞 |
  |---|---|---|---|---|---|
  | 01 | フィルター | デビュー前先行配信シングル | 詞曲: Yuji Hatada | `song-filter.html` | あり |
  | 02 | カオティックFour | 仮デビューシングル | 作詞: KOKI | `song-khaoticfour.html` | あり |
  | 03 | めっちゃいい | RIN ソロ | 詞曲: Yuji Hatada | `song-meccha-ii.html` | あり |
  | 04 | それって、風情 | RINTARO ソロ | 詞曲: Yuji Hatada | `song-sorette-fuzei.html` | あり |
  | 05 | Questioning | KOKI ソロ | 詞曲: Yuji Hatada | `song-questioning.html` | あり |
  | 06 | Smoky Mode | YUNO ソロ | 詞曲: Yuji Hatada | `song-smoky-mode.html` | あり |
  | 07 | 生成 | カバー（covered by KOKI） | **作詞作曲の表記なし** | `song-seisei.html` | あり |
  | 08 | フィルター | カバー（covered by YUNO） | 原曲の詞曲: Yuji Hatada | `song-filter-yuno.html` | あり |
  | — | 『KHAOS』 | デビュー前仮想アルバム（全8曲） | — | `album-khaos.html` | — |

  **8曲すべて、MV も歌詞も公開済み**（2026-08-20）。

  歌詞は `<div class="lyrics" style="--c:var(--<色>)">` の中に**そのまま改行つきで**入れる
  （CSS が `white-space:pre-wrap`）。`[Chorus]` のような区切りは
  `<span class="sec">Chorus</span>` にして**次の歌詞行の直前にくっつける**（見出しの前に空行は入れない。
  `.sec` 側に `margin-top:1.6em` があるため）。

  **07「生成」だけ作詞作曲の表記がない**ので、クレジットを空けてある。
  ただし歌詞は 8月15日の中間発表スライドの言葉（「完成じゃなくて生成でいい」ほか）と同じで、
  あれは4人が自分で書いたものと記録にある。**表記をどうするかは要確認。**
  **ジャケットの下の線の色は「誰が歌っているか」を表す。**
  ソロ曲とカバーはその人のメンバーカラー1色、**4人で歌っている曲（フィルター・カオティックFour）と
  アルバム『KHAOS』は4色**。4色にするには要素に `quad` クラスを付ける（`style.css` の `.quad`）。
  曲を足すときは、TOP の `#disc`・`discography.html`・`album-khaos.html`・その曲の `song-*.html` の
  4か所すべてで揃えること。

  01「フィルター」と08「フィルター（covered by YUNO）」は**同じ歌詞**。
  もともと 01 のページだけ字下げと区切りが違っていたので、2026-08-20 に 08 側（あとで届いたほう）に揃えた。
  **片方を直したらもう片方も直すこと。**

  なお YouTube 側のタイトルは「生成 feat.KOKI」「フィルター feat.YUNO」だが、
  サイトの表記は**依頼時の曲目どおり「covered by」**にしてある。
  旧・仮題（だいなり／もう一歩／きみ＞世界／ガクチカ／自己分析∞）はサイトから外した。
  「だいなり」は `khaos>` 期の歌詞案として story / interview の本文に残している。
- SNS アイコンはリンク先未設定（`href="#"`）。
- **YouTube にあるのは全8曲**（KhaosCamp チャンネル）。動画IDは各 `song-*.html` の iframe に入れてある。
  差し替えるときは **3か所**：その曲の `song-*.html` の `youtube.com/embed/<ID>` と `youtu.be/<ID>`、
  そして `discography.html` のカードの `youtu.be/<ID>`。
  `grep -rn "<旧ID>" site/` で取りこぼしがないか確かめること。
  TOP の `#release`・DISCOGRAPHY・MOVIE・NEWS・interview 冒頭・`album-khaos.html` から埋め込み／リンクしている。
  ジャケットは `site/assets/jacket_01_filter.jpg` 以降が正典。旧 `single_filter_jacket.jpg`（MV サムネイル由来）は**もうどこからも参照していない**（MOVIE のサムネに使っているのは `single_filter_thumb.jpg`）。
  **デビューライブは創作**（`00_pic/debut_live/` はイメージ画像）。interview の奥付にもその旨を明記している。
- `grep -rn "調 真理\|調真理\|しらべ\|Shirabe" site/` は通過済み（該当なし）。
- **NEWS の 2026.08.20 の1件（ソロ曲＋仮想アルバムの発表）は、サイトに載せた日を日付にしている。**
  実際の発表日が別にあるなら直すこと。

## GitHub / Vercel

- リポジトリ: https://github.com/yunolv3/khaoticfour （このフォルダ `KhaoticFour/` がルート）
- `knowledge/` は `.gitignore` で除外（審査・1on1 由来の記述を含むため）。ローカルにだけ置く。
- Vercel は `vercel.json` の `outputDirectory: "site"` で `site/` を静的配信する（ビルドなし）。
  `.vercelignore` で原本写真・knowledge・md はアップロードから外している。
- 写真を足したら `python3 site/_assets_build.py` → `git add site/assets` → push で Vercel が自動デプロイ。

### サイト全体に ID / パスワードをかけている（Basic 認証）

`middleware.js` が全ページ・全画像へのリクエストを受け止め、ID とパスワードが合わないと 401 を返す。
ブラウザの認証ダイアログが出るので、**入力しないと中身は一切見えない**（画像の直リンクも通らない）。

**Vercel 側で環境変数を設定しないとサイトが開かない**（未設定のときは 503 と案内文を返す＝安全側に倒してある）。

| 変数名 | 中身 |
|---|---|
| `SITE_USER` | ログインID（`:` は使えない。Basic 認証の区切り文字のため） |
| `SITE_PASSWORD` | パスワード（記号・日本語も可） |

Vercel ダッシュボード → 対象プロジェクト → **Settings → Environment Variables** で追加し、
**Production / Preview / Development すべてにチェック**を入れる。追加後に **Redeploy** が必要。

- **パスワードはリポジトリに書かない。** 環境変数だけで持つ。
- Vercel 標準の Password Protection は Enterprise か Pro＋月$150 のアドオンなので使っていない。
  Vercel Authentication（無料）は「Vercelにログインしているチームメンバーだけ」なので、
  メンバー以外に見せる用途には使えない。
- Basic 認証はブラウザを閉じるまで認証が残る。**ログアウト相当の操作はない。**
- 認証をやめたい場合は `middleware.js` と `package.json` を消して push すれば元の公開サイトに戻る。

## デプロイが失敗したときの記録（2026-08-18）

**症状**：GitHub のコミットに `Vercel — Deployment failed` のチェックが付くのに、
Vercel のダッシュボードにはデプロイが1件も現れず、Rebuild すら押せない。
push しても公開サイトが更新されない状態が続いた。

**直した内容**（`5fd9452`）：**npm の依存をゼロに戻し、ビルド不要の純粋な静的デプロイにした。**

- `middleware.js` が `@vercel/functions` の `next()` を1箇所だけ使っており、そのために
  `package.json` に依存が1つあった。このパッケージは **`node >= 20`** を要求する。
- ところがリポジトリには `engines` も `.nvmrc` も無く、ビルドに使われる Node は
  **Vercel のプロジェクト設定まかせ**だった。
- Vercel の middleware は**何も返さなければそのまま次へ進む**ので、`next()` は要らない。
  import を消し、`dependencies` を削除した。`next()` で付けていた `X-Robots-Tag` は
  `vercel.json` の `headers` に移した。認証の挙動は変えていない。

**原因の特定について（正直なところ）**：
上のコミットで**複数のことを同時に変えてしまった**ため、どれが効いたかを断定できていない。
可能性は2つある。

1. **依存の Node 要件**（本命）。依存が入ったのは `23fda62`（Basic 認証の追加）で、
   それ以前の `b20d5b6` までは依存ゼロの静的サイトだった。**失敗しはじめた時期と一致する。**
2. **デプロイ容量**。`live/`（60MB）が `.vercelignore` に入っておらず、毎回アップロードされていた。
   同じコミットでこれを除外し、その前の `d1320d4` では原本196MB を git から外している。
   結果、デプロイ対象は **143ファイル・約30MB** まで落ちた。

次に同じことが起きたら、**変更を1つずつ試して切り分けること**。

### この構成を壊さないための約束

- **このリポジトリに npm の依存を足さない。** 足した瞬間、ビルドが Node のバージョンに縛られる。
  `vercel.json` は `framework: null` / `buildCommand: ""` / `outputDirectory: "site"` で、
  **install もビルドも走らないのが正常な状態**。
- 画像を足すときは `site/assets/` の縮小版だけをコミットする（原本は `.gitignore` 済み）。
- **動画も `site/assets/` の書き出し済み mp4 だけ**（約10MB）。`00_movie/` の原本（約170MB）は入れない。
  デプロイ対象はこれで **約45MB**（画像 約34MB＋動画 約10MB）。ここからさらに増やすなら、まず容量を疑うこと。
- `.vercelignore` に**新しい原本フォルダを足し忘れない**。`live/` の見落としが実例。

