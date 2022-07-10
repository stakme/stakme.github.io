---
summary: 画像があっちこっちに出せるようになった
tags: [next.js]
published_at: s
draft: true
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

-   予定通り進んでいるか
-   障害になっていることはないか、取り除くにはどうしたらいいか
-   予想外の事態にどう対応するか

### pjt.close

-   すべてのタスクが完了していることを確認
-   学んだことを書き留めておく
-   さらに改善できることをメモ
