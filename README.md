# レンタカー多言語サポート (Rental Car Multilingual Support)

レンタカー業者向け外国人対応AIプロトタイプ。Claude APIを使って以下を多言語（日本語・英語・中文・한국어）で提供します。

- **マニュアルAI解説** — 貸出マニュアルのテキストを貼り付けると、AIが要点を整理して選択言語で説明
- **車種別 運転席ガイド** — 車種ごとの運転席まわりの操作を多言語で説明
- **事故時のAIサポート** — 事故発生時にAIがチャット形式で対応手順を案内
- **給油・充電ガイド**（サブ機能） — 車種の燃料タイプに応じた給油・充電方法を説明

## セットアップ

1. 依存関係をインストール: `npm install`
2. `.env.local.example` を `.env.local` にコピーし、`ANTHROPIC_API_KEY` に自分のAnthropic APIキーを設定
3. `npm run dev` で開発サーバーを起動

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
