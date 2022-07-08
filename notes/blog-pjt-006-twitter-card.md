---
summary: モダンなサイトっぽい体裁を整えた
tags: [next.js]
published_at: 2022-07-07T18:29:13+09:00[Asia/Tokyo]
---

### pjt.init

-   goal: 有用な情報を広めるPDCAが回る
-   measurable objectives:
    1. Twitter Card Validator を通過する
    2. Google Analytics を導入する
-   improvements:
    -   ツイッター経由のアクセスが心理的にしやすくなる
    -   ↑この仮説を計測できる
-   実施期間: 0.2日
-   必要なリソース
    -   人間1名 (@stakme)
-   費用: 無料
-   売上: なし

### pjt.plan

-   プライバシーポリシー設置 (0.2h)
-   メタデータ設定 (0.5h)
-   GA設定 (0.5h)

### pjt.exec

-   GA + Next.js 導入は参考になる記事が多くて助かりました。さすがド定番の組み合わせ
    -   [Next.js + Tailwind UI を使うとたった6時間で技術ブログのプロトタイプを作れる](https://panda-program.com/posts/from-gatsby-to-nextjs)
    -   [Next Script for Google Analytics](https://nextjs.org/docs/messages/next-script-for-ga)
-   ついでに画像周りで突っ込んだワークアラウンドを排除して、`public`ディレクトリを運用に乗せました

### pjt.close

-   GA設定に1時間弱かかったかも。メタデータは瞬殺だったのでトータルでは予定と大差なし
-   ついでに触り始めた Next.js Image の周辺がわからず、寄り道をしてしまった
