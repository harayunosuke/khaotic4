/* =========================================================
   Khaotic4 サイトデータ
   ---------------------------------------------------------
   サイトの中身（ニュース・メンバー・楽曲・MV・写真）はすべてここで編集します。
   画像パスはサイトのルート（index.html がある場所）からの相対パスで書いてください。
   例: "assets/images/profile/members/koki.png"
   ========================================================= */

window.SITE = {
  name: "Khaotic4",
  copyright: "© Khaotic4 All Rights Reserved.",

  /* ---------- SNS / 外部リンク（空欄のものは表示されません） ---------- */
  sns: {
    youtube: "",
    instagram: "",
    tiktok: "",
    x: "",
  },
  goodsUrl: "",   // GOODS（外部ショップURL）
  fanclubUrl: "", // FANCLUB（外部URL）

  /* ---------- トップのヒーロー ---------- */
  hero: {
    video: "assets/videos/hero.mp4",        // PC用 背景ループ動画
    videoSp: "assets/videos/hero-sp.mp4",   // スマホ用（軽量版）
    poster: "assets/images/hero/hero-main.jpg",
    logo: "assets/images/logo/logo.png",    // ヒーローに大きく出すロゴ（空欄なら文字）
    catchcopy: "BREAK THE ORDER.",
    playMovie: { video: "assets/videos/mv_chaos_kakumeika.mp4" }, // 「PLAY MOVIE」で再生（youtubeId でも可）
  },

  /* ---------- NEWS ---------- */
  // category: "LIVE" | "MEDIA" | "MUSIC" | "GOODS" | "INFO"
  news: [
    {
      date: "2026.10.01",
      category: "INFO",
      title: "Khaotic4 オフィシャルサイトをオープンしました",
      body: "Khaotic4 のオフィシャルサイトをオープンしました。最新情報はこちらでお知らせします。",
      image: "",
    },
    {
      date: "2026.09.20",
      category: "MUSIC",
      title: "「カオス革命家」Music Video 公開",
      body: "「カオス革命家」の Music Video を公開しました。MOVIE ページからご覧いただけます。",
      image: "assets/images/gallery/live/live_03.jpg",
    },
  ],

  /* ---------- PROFILE ---------- */
  group: {
    photo: "assets/images/profile/group/group-main.jpg",
    // 1段落ごとに "" で区切る。トップページには1段落目だけ表示されます。
    description: [
      "東京大学カオスキャンプ2026 から生まれた、原 優ノ介・加納 功喜・清水 麟太郎・紙谷 凛の4人組アート×テック・アイドルプロジェクト『Khaotic4（カオティックフォー）』。",
      "3次元では、木を切る人、絵を描く人、コードを書く人、光を投げる人──アーティスト／プログラマー／デザイナー。2次元では、アイドル。\n曲も歌詞も衣装も振付も、下手でも自分たちの手で本気で作り、それをAIに「プロデューサー役」として仕上げてもらう。ステージの途中でそのフィルターが剥がれ、地声と生身のダンスと手縫いの衣装があらわになる。フィルターの自分と、元の自分。その両方を「自分だ」と言い切れるか──それがKhaotic4のショウ。",
      "法則はあるのに、誰にも読めない。人はそれを偶然とは呼ばず、カオスと呼ぶ。十点でも二十点でも、出さなきゃずっとゼロのまま。完成じゃなくて、生成でいい。僕らなりのショウは、ここから大きくなる。",
    ],
  },

  // 表示順 = この並び順。項目が空欄のものは表示されません。
  members: [
    {
      id: "yuno",
      name: "YUNO",
      nameJa: "原 優ノ介",
      kana: "はら ゆうのすけ",
      romaji: "Yunosuke Hara",
      color: "#f5c518",
      colorName: "黄（Yellow）",
      role: "リーダー ／ 手を動かす人（木工・造形・空間）",
      from: "武蔵野美術大学 造形学部 空間演出デザイン学科",
      skill: "木材加工・レーザーカッター・3Dプリンター・3Dスキャン。ファッション→家具・インテリア→アートと歩いてきた",
      works: [
        "切り込み（kerfing）を入れて曲げた針葉樹の椅子",
        "石を3Dスキャンして透明樹脂で出力するインスタレーション",
      ],
      bio: "椅子に向かないと言われる針葉樹に切り込みを入れ、木を柔らかくして座れる形にする。散歩中に気になった石の「内側」を、割らずに見たくて透明な素材で出力する。「日常にあるものが当たり前に作られていることに、毎日のように感動してしまう」と語る、Khaotic4 の\"手\"であり、リーダー。話すのが好き。ステージでも工房でも、まず手を動かす。",
      photo: "assets/images/profile/members/yuno.png",
      realPhoto: "assets/images/gallery/photo/yuno.jpg",
      gallery: [
        "assets/images/profile/members/yuno-stage.jpg",
        "assets/images/profile/members/yuno-live.jpg",
        "assets/images/profile/members/yuno-backstage.jpg",
      ],
      sns: { instagram: "", x: "", tiktok: "" },
    },
    {
      id: "koki",
      name: "KOKI",
      nameJa: "加納 功喜",
      kana: "かのう こうき",
      romaji: "Koki Kano",
      color: "#f2f2f2",
      colorName: "白（White）",
      role: "話す人・描く人 ／ MC・フリートーク・朗読",
      from: "東京大学 文学部 人文学科 美術史学専修",
      skill: "3分間フリートーク、絵、朗読パフォーマンス、そしてクイズ",
      works: [
        "AIに書かせた詩を二人で読み合わせる作品「Googleマップを歩くAI」",
      ],
      bio: "理系で入学して、美術史へ。休学して、いま人生の途中で立ち止まっているところをそのまま舞台に持ってくる、Khaotic4 の\"声\"。推しの写真を見せながら3分間しゃべり続ける自己PR動画で審査員を笑わせ、絵を描き始めたきっかけ（初恋）を漫画にして賞をとった。「見せない作品もある。クリエイターは自意識との戦い」。白は、まだ何色にもなっていない色。",
      photo: "assets/images/profile/members/koki.png",
      realPhoto: "assets/images/gallery/photo/koki.jpg",
      gallery: [
        "assets/images/profile/members/koki-stage.jpg",
        "assets/images/profile/members/koki-live.jpg",
        "assets/images/profile/members/koki-backstage.jpg",
      ],
      sns: { instagram: "", x: "", tiktok: "" },
    },
    {
      id: "rintaro",
      name: "RINTARO",
      nameJa: "清水 麟太郎",
      kana: "しみず りんたろう",
      romaji: "Rintaro Shimizu",
      color: "#2f7bf5",
      colorName: "青（Blue）",
      role: "編集担当 ／ コードを書く人",
      from: "東京大学 工学部 計数工学科",
      skill: "プログラミング、ゲーム制作、電子工作（自作キーボードを秋葉原で販売）、映像編集",
      works: [
        "PCの「ウィンドウ」そのものを使うゲーム",
        "ブラウザゲーム『風情！ いけばなゲーム』（2050年、いけばなが国技になった日本の接客ゲーム）",
      ],
      bio: "校舎に寝泊まりし、肘掛けのない椅子を4つ並べてベッドにしていたところを同居人に見つかる──そんな日常をそのまま自己紹介漫画にした。「百の言葉よりも仕草や姿勢のほうが人間性は表れる」。世界観をまず決めてから作る。結成の朝、自分の役割を「俺は完全に編集担当」と宣言した Khaotic4 の\"編集点\"。カメラの後ろにも、前にも立つ。",
      photo: "assets/images/profile/members/rintaro.png",
      realPhoto: "assets/images/gallery/photo/rintaro.jpg",
      gallery: [
        "assets/images/profile/members/rintaro-stage.jpg",
        "assets/images/profile/members/rintaro-live.jpg",
        "assets/images/profile/members/rintaro-backstage.jpg",
      ],
      sns: { instagram: "", x: "", tiktok: "" },
    },
    {
      id: "rin",
      name: "RIN",
      nameJa: "紙谷 凛",
      kana: "かみたに りん",
      romaji: "Rin Kamitani",
      color: "#f06fa8",
      colorName: "ピンク（Pink）",
      role: "舞台演出 ／ 光を投げる人",
      from: "慶應義塾大学 環境情報学部（SFC）",
      skill: "プロジェクションマッピング、ドローンショー演出、映像演出（中学3年から）",
      works: [
        "東京都庁プロジェクションマッピング（都市空間に巨大な手を投影）",
        "大阪・関西万博の制作に参加",
      ],
      bio: "中学3年で映像演出を始め、高校生のうちにドローンショーのクリエイターとして現場に立った。「演出を考えて、PCを叩く人」の立場を貫いてきた最年少。万人受けしない、売れないと言われがちな\"ノイズ\"こそ宝だと考え、「なんだこれ」「キモいけど夢に出てきそう」と言われるものを作ってきた。Khaotic4 の\"光\"であり、ステージの設計者。結成の朝、自ら「メンバーカラーはピンクです」と宣言した。",
      photo: "assets/images/profile/members/rin.png",
      realPhoto: "assets/images/gallery/photo/rin.jpg",
      gallery: [
        "assets/images/profile/members/rin-stage.jpg",
        "assets/images/profile/members/rin-live.jpg",
        "assets/images/profile/members/rin-backstage.jpg",
      ],
      sns: { instagram: "", x: "", tiktok: "" },
    },
  ],

  /* ---------- DISCOGRAPHY ---------- */
  // 上から順に表示されます（新しいものを上に）。
  // type: "Single" | "Digital Single" | "EP" | "Album" | "Cover"
  // date / tracks / links は分かり次第入れてください（空欄は非表示）。
  discography: [
    { title: "KHAOS", type: "1st Virtual Album", date: "", jacket: "assets/images/discography/10_khaos.jpg", tracks: [], links: {} },
    { title: "フィルター (covered by YUNO)", type: "Cover", date: "", jacket: "assets/images/discography/08_filter_covered_by_yuno.jpg", tracks: [], links: {} },
    { title: "生成", type: "Digital Single", date: "", jacket: "assets/images/discography/07_seisei.jpg", tracks: [], links: {} },
    { title: "Smoky Mode feat. YUNO", type: "Digital Single", date: "", jacket: "assets/images/discography/06_smoky_mode.jpg", tracks: [], links: {} },
    { title: "Questioning feat. KOKI", type: "Digital Single", date: "", jacket: "assets/images/discography/05_questioning.jpg", tracks: [], links: {} },
    { title: "それって、風情 feat. RINTARO", type: "Digital Single", date: "", jacket: "assets/images/discography/04_sorette_fuzei.jpg", tracks: [], links: {} },
    { title: "めっちゃいい feat. RIN", type: "Digital Single", date: "", jacket: "assets/images/discography/03_meccha_ii.jpg", tracks: [], links: {} },
    { title: "カオティックFour", type: "Digital Single", date: "", jacket: "assets/images/discography/02_khaotic_four.jpg", tracks: [], links: {} },
    { title: "フィルター", type: "Digital Single", date: "", jacket: "assets/images/discography/01_filter.jpg", tracks: [], links: {} },
  ],

  /* ---------- MOVIE / MV ---------- */
  // YouTube の場合: youtubeId を入れる（サムネイルは自動取得）
  // 手元の動画ファイルの場合: video にパスを入れる（thumb が無ければ動画の1コマを表示）
  // featured: true にしたものがトップの MUSIC VIDEO 欄に並びます（最大3本）。
  movies: [
    {
      title: "カオス革命家 (Music Video)",
      date: "2026.09.20",
      category: "MV",
      youtubeId: "",
      video: "assets/videos/mv_chaos_kakumeika.mp4",
      thumb: "",
      featured: true,
    },
  ],

  /* ---------- GALLERY ---------- */
  // dir の中の files を並べます。写真を足すときはフォルダに入れて files に名前を追加。
  gallery: [
    { category: "PHOTO", dir: "assets/images/gallery/photo/", files: ["koki.jpg", "rin.jpg", "rintaro.jpg", "yuno.jpg"] },
    { category: "LIVE", dir: "assets/images/gallery/live/", files: ["live_01.jpg", "live_02.jpg", "live_03.jpg", "group_01.jpg", "group_02.jpg", "group_03.jpg"] },
    { category: "COSTUME", dir: "assets/images/gallery/costume/", files: ["costume_koki.jpg", "costume_rin.jpg", "costume_rintaro.jpg", "costume_yuno.jpg"] },
    { category: "MV MAKING", dir: "assets/images/gallery/making/", files: ["making_koki4.jpg", "making_koki5.jpg", "making_rin6.jpg", "making_rin7.jpg", "making_rin8.jpg", "making_rintaro2.jpg", "making_rintaro3.jpg", "making_yuno3.jpg", "making_yuno4.jpg", "making_yuno5.jpg"] },
    {
      category: "INTERVIEW",
      dir: "assets/images/gallery/interview/",
      files: [
        "interview_all1.jpg", "interview_all2.jpg",
        "interview_koki1.jpg", "interview_koki2.jpg", "interview_koki6.jpg", "interview_koki7.jpg", "interview_koki8.jpg", "interview_koki9.jpg", "interview_koki10.jpg",
        "interview_rin1.jpg", "interview_rin2.jpg", "interview_rin9.jpg", "interview_rin10.jpg", "interview_rin11.jpg", "interview_rin12.jpg", "interview_rin13.jpg",
        "interview_rintaro1.jpg", "interview_rintaro2.jpg", "interview_rintaro4.jpg", "interview_rintaro5.jpg",
        "interview_yuno1.jpg", "interview_yuno2.jpg", "interview_yuno6.jpg", "interview_yuno7.jpg", "interview_yuno8.jpg",
      ],
    },
    {
      category: "BEFORE DEBUT",
      dir: "assets/images/gallery/before-debut/",
      files: ["koki.jpg", "koki1.jpg", "koki2.jpg", "koki3.jpg", "rin.jpg", "rin1.jpg", "rin2.jpg", "rin3.jpg", "rin4.jpg", "rin5.jpg", "rintaro.jpg", "yuno1.jpg", "yuno2.jpg"],
    },
    { category: "EVENT", dir: "assets/images/gallery/event/", files: ["oshi_vote_01_four.jpg", "oshi_vote_02_chant.jpg"] },
  ],
};
