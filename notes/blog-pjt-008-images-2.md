---
summary: 「og:imageシュッと作るくん」を作った
og_title: |
    「og:imageシュッと作るくん」
    を作った
tags: [next.js]
published_at: 2022-07-10T17:09:49+09:00[Asia/Tokyo]
---

### pjt.init

-   goal: 画像がたくさんあって取っ付きやすくなる
-   measurable objectives:
    1. 各記事の Twitter Card が画像付きになる
-   improvements:
    -   毎回手で設定しなくても、自動生成の画像をあてにできる
-   実施期間: 0.5日

### pjt.plan

-   canvasをいじり回し、記事の内容から画像を自動生成する (3h)
-   その画像をTwitter Cardに設定する (0.5h)
    -   記事独自のCard画像を設定する機能はとりあえず作らない

### pjt.exec

-   node-canvasを使う。シュッとApple Siliconに入らないけど[issue](https://github.com/Automattic/node-canvas/issues/1733)を見て解決
-   Canvas何もわからなくて丸１日かかってしまった…
-   画像に書き込む「いい感じに改行されたテキスト」を楽に書くためにパーサーにも手を入れた

### pjt.close

-   Canvasおもろい（感想）
-   現状だと「強制的にog:image設定」されるが、準備済みの画像を入れたいケースが出てきたら改造する
