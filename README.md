# 仮想通貨通知システム

## 機能

- 暗号通貨のレート情報表示
- 価格アラート
- 自動取引

## 使用技術

- **フロントエンド**

  - **React**
  - **TypeScript**

- **バックエンド**
  - **Node.js**
  - **TypeScript**

## 開始手順

### 1. リポジトリをクローン

git clone https://github.com/aiba-22/crypto_robo.git

### 2. Docker コンテナのビルドと起動

docker-compose up
フロントエンド、バックエンド、バッチ、データベースが立ち上がります。

### 3. アプリケーションへのアクセス

http://localhost:8000

### 価格情報画面

<img width="1438" alt="スクリーンショット 0006-08-18 19 12 40" src="https://github.com/user-attachments/assets/53002d8c-d0af-46fa-ac87-7d32cfcb20e2">

### 通知設定画面

<img width="1438" alt="スクリーンショット 0006-08-18 19 12 32" src="https://github.com/user-attachments/assets/e5d8e993-2774-40c9-8ac6-d6453e1abd8c">
LINE Notify より発行したアクセストークンが必要です。

### LINE 画面（通知時）

<img width="677" alt="スクリーンショット 0006-08-18 22 12 54" src="https://github.com/user-attachments/assets/325af46a-5619-40d4-8b4b-298826d4bd43">
