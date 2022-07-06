---
summary: GitHub Action から直接 GitHub Pages を差し替える
tags: [next.js]
published_at: 2022-07-06T19:03:41+09:00[Asia/Tokyo]
---

### pjt.init

-   goal: gitの履歴からゴミが一掃される
-   measurable objectives:
    1. GitHub Action によりビルドが行われる
    2. GitHub Action によりGitHub Pagesが更新される
-   improvements:
    -   適正な .gitignore が導入でき、masterブランチにマージできるようになる
    -   ブランチ保護が利用可能になる
-   実施期間: 0.5日
-   必要なリソース
    -   人間1名 (@stakme)
-   費用: 無料
-   売上: なし

### pjt.plan

-   CIビルド (1h)
-   CIデプロイ (1h)

### pjt.exec

-   デプロイまわり、実はまだあまり出来上がっておらず、アクションの整備状況が微妙だった
-   結論だけ言うと、公式アクションを組み合わせることでGitHub ActionからGitHub Pagesを更新することが可能
-   それは別途記事にするかも

### pjt.close

-   結果としてデプロイできたが、断続的に2.5時間くらいかかってしまった
-   もうちょい早めに「公式アクションを組み合わせてデプロイする」というアプローチを諦めてもよかったかも
-   次回は再びパーサーの強化です（リスト表示をマシにしたい）
