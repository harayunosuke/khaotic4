/* =========================================================
   khaotic4 共通スクリプト
   ヘッダー / フッター / 各セクションを data.js から描画します。
   各ページの <body data-root="../"> でルートまでの相対パスを指定。
   ========================================================= */
(() => {
  const S = window.SITE;
  const ROOT = document.body.dataset.root || "";
  const PAGE = document.body.dataset.page || "top";
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const p = (path) => (!path || /^https?:/.test(path) ? path : ROOT + path);

  /* 画像が無いときは「置くべきファイル名」を表示するプレースホルダーに差し替え */
  const img = (src, alt = "", cls = "") =>
    src
      ? `<div class="ph ${cls}" data-file="${esc(src)}"><img src="${esc(p(src))}" alt="${esc(alt)}" loading="lazy" onerror="this.remove()"></div>`
      : `<div class="ph ${cls}" data-file="no image"></div>`;

  const ytThumb = (m) => (m.thumb ? p(m.thumb) : m.youtubeId ? `https://i.ytimg.com/vi/${m.youtubeId}/maxresdefault.jpg` : "");
  const movieThumb = (m, cls = "") => {
    // 手元の動画でサムネイル未指定なら、動画の数秒目のコマをそのまま表示
    if (!m.thumb && !m.youtubeId && m.video)
      return `<div class="ph ${cls}" data-file="${esc(m.video)}"><video src="${esc(p(m.video))}#t=6" preload="metadata" muted playsinline></video></div>`;
    const src = ytThumb(m);
    const fallback = m.youtubeId ? `https://i.ytimg.com/vi/${m.youtubeId}/hqdefault.jpg` : "";
    return `<div class="ph ${cls}" data-file="${esc(m.thumb || "YouTube ID 未設定")}">${
      src ? `<img src="${esc(src)}" alt="${esc(m.title)}" loading="lazy" onerror="${fallback ? `if(this.src!=='${fallback}'){this.src='${fallback}'}else{this.remove()}` : "this.remove()"}">` : ""
    }</div>`;
  };

  /* ---------- SNS アイコン ---------- */
  const ICONS = {
    youtube: '<svg viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24"><path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.3V2h-3.4v13.7a2.9 2.9 0 1 1-2-2.8V9.4a6.3 6.3 0 1 0 5.4 6.3V8.8a8.2 8.2 0 0 0 4.8 1.5V6.9l-1-.2z"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4 5.5-6.4zm-1.2 17.9h1.9L7 4.2H5l12 16z"/></svg>',
  };
  const snsLinks = (sns = {}) =>
    Object.entries(sns)
      .filter(([k, v]) => v && ICONS[k])
      .map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener" aria-label="${k}">${ICONS[k]}</a>`)
      .join("");

  /* ---------- ヘッダー / フッター ---------- */
  const NAV = [
    ["TOP", "", "top"],
    ["NEWS", "news/", "news"],
    ["PROFILE", "profile/", "profile"],
    ["DISCOGRAPHY", "discography/", "discography"],
    ["MOVIE", "movie/", "movie"],
    ["GALLERY", "gallery/", "gallery"],
  ];
  const navHtml = () =>
    NAV.map(([label, href, key]) => `<li><a href="${ROOT}${href}index.html" class="${PAGE === key ? "is-current" : ""}">${label}</a></li>`).join("") +
    (S.goodsUrl ? `<li><a href="${esc(S.goodsUrl)}" target="_blank" rel="noopener">GOODS</a></li>` : "") +
    (S.fanclubUrl ? `<li><a href="${esc(S.fanclubUrl)}" target="_blank" rel="noopener">FANCLUB</a></li>` : "");

  const logo = `<img src="${ROOT}assets/images/logo/logo.png" alt="${esc(S.name)}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'logo-text',textContent:'${esc(S.name)}'}))">`;

  const header = $("#site-header");
  if (header) {
    header.innerHTML = `
      <div class="header-inner">
        <a class="header-logo" href="${ROOT}index.html">${logo}</a>
        <button class="menu-btn" aria-label="メニュー" aria-expanded="false"><span></span><span></span></button>
      </div>
      <nav class="global-nav">
        <ul>${navHtml()}</ul>
        <div class="sns">${snsLinks(S.sns)}</div>
      </nav>`;
    const btn = $(".menu-btn", header);
    btn.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", open);
    });
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const footer = $("#site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="footer-inner">
        <a class="footer-logo" href="${ROOT}index.html">${logo}</a>
        <ul class="footer-nav">${navHtml()}</ul>
        <div class="sns">${snsLinks(S.sns)}</div>
        <p class="copyright">${esc(S.copyright)}</p>
      </div>`;
  }

  /* ---------- 動画モーダル ---------- */
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `<div class="modal-bg"></div><div class="modal-body"><button class="modal-close" aria-label="閉じる">×</button><div class="modal-content"></div></div>`;
  document.body.appendChild(modal);
  const openModal = (html, cls = "") => {
    modal.className = `modal is-open ${cls}`;
    $(".modal-content", modal).innerHTML = html;
    document.body.classList.add("modal-open");
  };
  const closeModal = () => {
    modal.className = "modal";
    $(".modal-content", modal).innerHTML = "";
    document.body.classList.remove("modal-open");
  };
  modal.addEventListener("click", (e) => {
    if (e.target.matches(".modal-bg, .modal-close")) closeModal();
  });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());

  const playVideo = ({ yt, video }) => {
    if (yt)
      return openModal(`<div class="video-wrap"><iframe src="https://www.youtube.com/embed/${encodeURIComponent(yt)}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`, "is-video");
    if (video)
      return openModal(`<div class="video-wrap"><video src="${esc(video)}" controls autoplay playsinline></video></div>`, "is-video");
    alert("data.js で youtubeId か video を設定してください");
  };
  // 動画を開くリンク: data-yt（YouTube ID）/ data-video（動画ファイル）
  const videoAttrs = (m) => `data-play data-yt="${esc(m.youtubeId || "")}" data-video="${esc(m.video ? p(m.video) : "")}"`;
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-play]");
    if (t) {
      e.preventDefault();
      playVideo(t.dataset);
      return;
    }
    const z = e.target.closest("[data-zoom]");
    if (z) {
      e.preventDefault();
      openModal(`<img class="zoom-img" src="${esc(z.dataset.zoom)}" alt="">`, "is-photo");
    }
  });

  /* ---------- 各パーツ ---------- */
  const newsItem = (n, i) => `
    <li class="news-item" data-cat="${esc(n.category)}">
      <a href="${ROOT}news/index.html#news-${i}">
        <time>${esc(n.date)}</time><span class="cat">${esc(n.category)}</span><p>${esc(n.title)}</p>
      </a>
    </li>`;
  const sortedNews = () => S.news.map((n, i) => ({ ...n, i })).sort((a, b) => b.date.localeCompare(a.date));

  const movieCard = (m) => `
    <a class="movie-card" href="#" ${videoAttrs(m)}>
      <div class="movie-thumb">${movieThumb(m)}<span class="play"></span></div>
      <div class="movie-meta"><span class="cat">${esc(m.category)}</span><time>${esc(m.date)}</time></div>
      <p class="movie-title">${esc(m.title)}</p>
    </a>`;

  const memberCard = (m) => `
    <button class="member-card" data-member="${esc(m.id)}" style="--mc:${esc(m.color || "#fff")}">
      ${img(m.photo, m.name, "member-photo")}
      <span class="member-name">${esc(m.name)}</span>
      ${m.nameJa ? `<span class="member-name-ja">${esc(m.nameJa)}</span>` : ""}
    </button>`;

  const discItem = (d) => {
    const links = Object.entries(d.links || {})
      .filter(([, v]) => v)
      .map(([k, v]) => `<a class="btn-sm" href="${esc(v)}" target="_blank" rel="noopener">${k.toUpperCase()}</a>`)
      .join("");
    return `
      <article class="disc-item">
        ${img(d.jacket, d.title, "disc-jacket")}
        <div class="disc-info">
          <span class="cat">${esc(d.type)}</span>
          <h3>${esc(d.title)}</h3>
          ${d.date ? `<time>${esc(d.date)} Release</time>` : ""}
          ${d.tracks?.length ? `<ol class="tracks">${d.tracks.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>` : ""}
          ${links ? `<div class="disc-links">${links}</div>` : ""}
        </div>
      </article>`;
  };

  // トップ用: ジャケットだけのタイル
  const discTile = (d) => `
    <a class="disc-tile" href="${ROOT}discography/index.html">
      ${img(d.jacket, d.title, "disc-jacket")}
      <span class="cat">${esc(d.type)}</span>
      <p>${esc(d.title)}</p>
    </a>`;

  // 文字列 or 配列 → <p> の並び（改行も反映）
  const paras = (t) => [].concat(t || []).map((x) => `<p class="lead">${esc(x)}</p>`);

  const allPhotos = () => (S.gallery || []).flatMap((g) => g.files.map((f) => ({ cat: g.category, src: g.dir + f })));
  const galleryItem = (ph) => `<a class="gallery-item" href="#" data-zoom="${esc(p(ph.src))}">${img(ph.src, ph.cat)}</a>`;

  const fill = (sel, html) => {
    const el = $(sel);
    if (el) el.innerHTML = html;
    return el;
  };

  /* ---------- ヒーロー ---------- */
  const hero = $("#hero");
  if (hero) {
    const h = S.hero;
    const heroVideo = h.videoSp && matchMedia("(max-width: 767px)").matches ? h.videoSp : h.video;
    const pm = h.playMovie || {};
    hero.innerHTML = `
      <div class="hero-media">
        ${h.poster ? `<img src="${p(h.poster)}" alt="" onerror="this.remove()">` : ""}
        ${heroVideo ? `<video src="${p(heroVideo)}" autoplay muted loop playsinline ${h.poster ? `poster="${p(h.poster)}"` : ""}></video>` : ""}
      </div>
      <div class="hero-text">
        <h1 class="hero-title">${h.logo ? `<img src="${p(h.logo)}" alt="${esc(S.name)}">` : esc(S.name)}</h1>
        <p class="hero-copy">${esc(h.catchcopy)}</p>
        ${pm.youtubeId || pm.video ? `<a href="#" class="play-movie" ${videoAttrs(pm)}><span class="play"></span>PLAY MOVIE</a>` : ""}
      </div>
      <div class="scroll-sign">SCROLL</div>`;
    const v = $("video", hero);
    if (v) v.addEventListener("error", () => v.remove(), true);
  }

  /* ---------- TOP ---------- */
  const featured = S.movies.filter((m) => m.featured).slice(0, 3);
  fill("#top-mv", featured.map(movieCard).join(""));
  fill("#top-news", sortedNews().slice(0, 5).map((n) => newsItem(n, n.i)).join(""));
  fill("#top-profile-text", paras(S.group.description).join(""));
  fill("#top-profile-photo", img(S.group.photo, S.name, "group-photo"));
  fill("#top-members", S.members.map(memberCard).join(""));
  fill("#top-disc", S.discography.map(discTile).join(""));
  // トップの GALLERY: 先頭から8枚（PHOTO → LIVE の順）
  fill("#top-gallery", allPhotos().slice(0, 8).map(galleryItem).join(""));
  fill("#top-movie", [...S.movies].sort((a, b) => b.date.localeCompare(a.date)).map(movieCard).join(""));

  /* ---------- NEWS ページ ---------- */
  const newsList = $("#news-list");
  if (newsList) {
    const cats = ["ALL", ...new Set(S.news.map((n) => n.category))];
    fill(
      "#news-tabs",
      cats.map((c, i) => `<button class="tab ${i === 0 ? "is-active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("")
    );
    newsList.innerHTML = sortedNews()
      .map(
        (n) => `
      <li class="news-article" id="news-${n.i}" data-cat="${esc(n.category)}">
        <details>
          <summary><time>${esc(n.date)}</time><span class="cat">${esc(n.category)}</span><p>${esc(n.title)}</p></summary>
          <div class="news-body">${n.image ? img(n.image, n.title, "news-image") : ""}<p>${esc(n.body)}</p></div>
        </details>
      </li>`
      )
      .join("");
    $("#news-tabs").addEventListener("click", (e) => {
      const b = e.target.closest(".tab");
      if (!b) return;
      document.querySelectorAll("#news-tabs .tab").forEach((t) => t.classList.toggle("is-active", t === b));
      newsList.querySelectorAll(".news-article").forEach((li) => {
        li.hidden = b.dataset.cat !== "ALL" && li.dataset.cat !== b.dataset.cat;
      });
    });
    const target = location.hash && $(location.hash);
    if (target) {
      $("details", target).open = true;
      target.scrollIntoView();
    }
  }

  /* ---------- PROFILE ページ ---------- */
  fill("#group-photo", img(S.group.photo, S.name, "group-photo"));
  fill("#group-text", `<h2 class="group-name">${esc(S.name)}</h2>${paras(S.group.description).join("")}`);
  fill("#member-list", S.members.map(memberCard).join(""));

  document.addEventListener("click", (e) => {
    const c = e.target.closest("[data-member]");
    if (!c) return;
    const m = S.members.find((x) => x.id === c.dataset.member);
    const works = [].concat(m.works || []);
    const rows = [
      ["COLOR", m.colorName && `<span class="swatch"></span>${esc(m.colorName)}`],
      ["ROLE", esc(m.role || "")],
      ["FROM", esc(m.from || "")],
      ["SKILL", esc(m.skill || "")],
      ["WORKS", works.length ? `<ul class="works">${works.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>` : ""],
    ].filter(([, v]) => v);
    openModal(
      `<div class="member-detail" style="--mc:${esc(m.color || "#fff")}">
        ${img(m.photo, m.name, "member-detail-photo")}
        <div class="member-detail-info">
          <h2>${esc(m.name)}</h2>
          ${m.nameJa ? `<p class="name-ja">${esc(m.nameJa)}${m.kana ? `<small>${esc(m.kana)}</small>` : ""}</p>` : ""}
          ${m.romaji ? `<p class="romaji">${esc(m.romaji)}</p>` : ""}
          ${rows.length ? `<dl>${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>` : ""}
          <div class="sns">${snsLinks(m.sns)}</div>
        </div>
        ${m.bio ? `<p class="member-bio">${esc(m.bio)}</p>` : ""}
        ${m.realPhoto ? img(m.realPhoto, m.name, "member-real-photo") : ""}
        ${m.gallery?.length ? `<div class="member-gallery">${m.gallery.map((g) => img(g, m.name, "member-gallery-photo")).join("")}</div>` : ""}
      </div>`,
      "is-member"
    );
  });

  /* ---------- DISCOGRAPHY / MOVIE ページ ---------- */
  fill("#disc-list", S.discography.map(discItem).join(""));

  /* ---------- GALLERY ページ ---------- */
  const galleryList = $("#gallery-list");
  if (galleryList && S.gallery) {
    const photos = allPhotos();
    fill("#gallery-tabs", ["ALL", ...S.gallery.map((g) => g.category)].map((c, i) => `<button class="tab ${i === 0 ? "is-active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join(""));
    const render = (cat) =>
      (galleryList.innerHTML = photos
        .filter((ph) => cat === "ALL" || ph.cat === cat)
        .map(galleryItem)
        .join(""));
    render("ALL");
    $("#gallery-tabs").addEventListener("click", (e) => {
      const b = e.target.closest(".tab");
      if (!b) return;
      document.querySelectorAll("#gallery-tabs .tab").forEach((t) => t.classList.toggle("is-active", t === b));
      render(b.dataset.cat);
    });
  }
  const movieList = $("#movie-list");
  if (movieList) {
    const cats = ["ALL", ...new Set(S.movies.map((m) => m.category))];
    fill("#movie-tabs", cats.map((c, i) => `<button class="tab ${i === 0 ? "is-active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join(""));
    const render = (cat) =>
      (movieList.innerHTML = [...S.movies]
        .filter((m) => cat === "ALL" || m.category === cat)
        .sort((a, b) => b.date.localeCompare(a.date))
        .map(movieCard)
        .join(""));
    render("ALL");
    $("#movie-tabs").addEventListener("click", (e) => {
      const b = e.target.closest(".tab");
      if (!b) return;
      document.querySelectorAll("#movie-tabs .tab").forEach((t) => t.classList.toggle("is-active", t === b));
      render(b.dataset.cat);
    });
  }

  /* ---------- 横スクロールカルーセルの矢印 ---------- */
  document.querySelectorAll("[data-carousel]").forEach((wrap) => {
    const track = $(".carousel-track", wrap);
    (wrap.closest("section") || wrap).querySelectorAll("[data-dir]").forEach((b) =>
      b.addEventListener("click", () => track.scrollBy({ left: track.clientWidth * 0.8 * +b.dataset.dir, behavior: "smooth" }))
    );
  });

  /* ---------- スクロールでフェードイン ---------- */
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
