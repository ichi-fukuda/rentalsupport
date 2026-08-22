# レンタカー多言語サポート (Rental Car Multilingual Support)

レンタカー業者向け外国人対応AIプロトタイプ。Claude APIを使って多言語（日本語・英語・中文・한국어）でサービスを提供します。

## サービス内容

### ホスト（レンタカー店舗）側
- 新規申込み（契約台数・オプション選択）→ メール/パスワードでログイン
- 車両登録（車種・年式・運転席操作・給油/充電方法）、貸出マニュアル登録
- ステップ設定（同意書テキスト、免許登録/傷確認の必須化、事故対応AIへの店舗独自指示）
- 店頭QRコード・車両ごとのQRコード発行
- 事故レポート一覧（AIがヒアリングした内容の構造化レポート。保険会社への連絡は店舗が手動で行う想定）
- 貸出履歴（返却手続き後、車両状態を確認して完了にする）

### 利用客側
- **借りる時**：店頭QRを読み込み → 同意書確認 → 免許証写真登録 → 車の傷確認写真撮影 → 鍵受け取り → 車内QRで運転席説明を多言語表示
- **事故時**：AIとのチャットでヒアリング → 内容をホストに共有（構造化レポートとして保存）
- **返却時**：給油・充電案内 → 車両写真撮影 → 店頭で確認してもらい完了

### デモ（店舗登録なしで単体で試せる機能）
- マニュアルAI解説 / 車種別運転席ガイド / 事故対応AIチャット

## セットアップ

1. 依存関係をインストール: `npm install`
2. `.env.local.example` を `.env.local` にコピーし、`ANTHROPIC_API_KEY` に自分のAnthropic APIキーを設定
   （`.env` の `DATABASE_URL` / `SESSION_SECRET` は自動生成済み）
3. データベースを作成: `npx prisma migrate dev`（初回のみ。以降スキーマ変更時に再実行）
4. `npm run dev` で開発サーバーを起動
5. ホストとして試す場合は `/host/signup` から新規申込み → 車両登録 → 店頭QR/車両QRのURLをブラウザで開いて客側フローを確認

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
