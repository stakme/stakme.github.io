---
summary: 技術的負債をお返しした
tags: [next.js]
published_at: 2022-07-05T23:42:37+09:00[Asia/Tokyo]
---

### pjt.init

-   goal: プロジェクト進捗をよくして記事を書く時間を捻出する
-   measurable objectives:
    1. TypeScriptが導入され、全てのJSファイルが置換される
    2. Tailwind CSSが導入され、一つ以上のページで実際に利用され、コンパイルされている
    3. lint, formatter (少なくともPrettier) が導入されている
-   improvements:
    -   改善スピードが上がる
-   実施期間: 0.5日
-   必要なリソース
    -   人間1名 (@stakme)
-   費用: 無料
-   売上: なし

### pjt.plan

-   TypeScript導入 (1h)
-   既存ロジックのTypeScript化 (1h)
-   Tailwind CSS 導入と試用 (1h)
-   Prettier, Eslint をシュッと突っ込めるだけ突っ込む (1h)

### pjt.exec

-   TypeScript導入簡単すぎてひっくり返った、1分で終わった https://nextjs.org/docs/basic-features/typescript
-   既存ロジックのTS化は、完全に勝手を忘れており1hちゃんとかかりました
-   他はまあ想定通りに進行

### pjt.close

-   かなり見られるソースコードになりました、めでたし
-   次回はGitHub Action導入です
