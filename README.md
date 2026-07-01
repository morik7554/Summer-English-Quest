# 夏休み英語課題ページ

中学3年生向けの夏休み英語課題ページです。HTML / CSS / JavaScript の静的サイトです。

## Vercel Import 設定

- Framework Preset: Other
- Root Directory: 空欄のまま、または `.`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

## ローカル確認

```bash
npm install
npm run build
npm start
```

確認URL:

```text
http://127.0.0.1:4173
```

## 構成

- `index.html`: ページ本体
- `style.css`: デザイン
- `script.js`: ページ内スクロールとカウントダウン
- `assets/`: 背景画像とPDF用画像
- `pdf/`: 生徒が開くPDF

## 注意

2学期の始業式の日付は `script.js` の `openingCeremonyDate` で設定しています。
