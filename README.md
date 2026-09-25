# khaotic4 OFFICIAL SITE

This is a static site modeled on the structure of STARGLOW's official site (starglow.tokyo): TOP / NEWS / PROFILE / DISCOGRAPHY / MOVIE, plus GOODS and FANCLUB as external links.
Double-click `index.html` to view it in a browser. No server needed.

## Folder layout

```
khaotic4 web/
├─ index.html              TOP (hero → MUSIC VIDEO → NEWS → PROFILE → DISCOGRAPHY → MOVIE)
├─ news/index.html         News list (category tabs, click a headline to expand the body)
├─ profile/index.html      Group profile + members (click a member for the detail popup)
├─ discography/index.html  Releases (jacket, track list, streaming links)
├─ movie/index.html        Videos (category tabs, plays in a YouTube popup)
└─ assets/
   ├─ css/style.css        Design (colors and fonts are set in :root at the top)
   ├─ js/data.js           ★ All site content is edited here
   ├─ js/main.js           Rendering logic (normally no need to touch)
   ├─ fonts/               Custom fonts (optional)
   ├─ videos/              hero.mp4 (top background loop video)
   └─ images/
      ├─ logo/             logo.svg, favicon.png
      ├─ hero/             hero-main.jpg
      ├─ ogp/              ogp.jpg (image shown when the link is shared on social media)
      ├─ profile/group/    group-main.jpg
      ├─ profile/members/  member1〜4.jpg, member1〜4-sub.jpg
      ├─ discography/      jacket images
      ├─ movie/            thumbnails (optional)
      └─ news/             news images (optional)
```

Each image folder has a `_ここに置くもの.txt` note listing the file names and recommended sizes.
Until an image is added, its spot shows a placeholder with the file name that goes there.

## How to update

| What | How |
|---|---|
| Change member names and profiles | Edit `members` in `assets/js/data.js` |
| Add profile photos | Put `member1.jpg` etc. in `assets/images/profile/members/` |
| Add an MV | Upload it to YouTube, then add `youtubeId` to `movies` in `data.js` (`featured: true` shows it at the top of the home page) |
| Top page "PLAY MOVIE" button | Put a YouTube ID in `hero.playMovieId` in `data.js` |
| Add news | Add a new entry to `news` in `data.js` (sorted by date automatically) |
| Add a release | Add to `discography` in `data.js` + put the jacket image in `images/discography/` |
| SNS / GOODS / FANCLUB | Fill in the URLs in `sns`, `goodsUrl` and `fanclubUrl` in `data.js` (blank ones stay hidden) |
| Theme color | Change `--accent` in `assets/css/style.css` |

A YouTube ID is the `xxxxxxxxxxx` part of `https://www.youtube.com/watch?v=xxxxxxxxxxx`.
