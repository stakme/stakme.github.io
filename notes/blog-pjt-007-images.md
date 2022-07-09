---
summary: 公開を制御できるようになった
tags: [next.js]
published_at: 2022-07-09T13:49:27+09:00[Asia/Tokyo]
---

### pjt.init

-   goal: 意図しない公開を防ぐ
-   measurable objectives:
    1. `draft: true` オプションがあるマークダウンは公開されない
-   improvements:
    -   下書きやテンプレートを保存することができる
-   実施期間: 0.1日

### pjt.plan

-   パーサー改造 (0.1h)
-   記事一覧から `draft: true` が設定された記事を取り除く (0.1h)

### pjt.exec

-   瞬殺

### pjt.close

-   記事作成時のテンプレートをgitに突っ込めるようになった！
-   書いた記事をあとから非公開にするのも簡単になった
    -   非公開にしたところでgitの歴史には残り続けるので、そこまで意味はないが…
