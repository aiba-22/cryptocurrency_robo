暗号通貨の価格を監視し、アラート通知や自動取引を行うシステムです。


---


##  主な機能

###  価格アラート
- 任意の価格条件を設定し、条件に達したときにLINEに通知する
<img width="843" alt="スクリーンショット 0007-05-21 14 20 45" src="https://github.com/user-attachments/assets/8a7cebe6-6bab-4f4c-aa26-4a550c1946ad" />


###  自動取引
- 売買条件を設定し、条件達成時に自動で注文する
- 注文結果（成功/失敗）をLINEに通知する
<img width="829" alt="スクリーンショット 0007-05-21 14 20 00" src="https://github.com/user-attachments/assets/2e14f41c-aa7e-4988-aa4a-d9175247b6ca" />

### 各種設定
- LINE通知するためのMessagingAPIのキー情報を設定。
- 自動取引用のGMOコインAPIのキー情報を設定。
<img width="829" alt="スクリーンショット 0007-05-21 14 20 00" src="https://github.com/user-attachments/assets/2e14f41c-aa7e-4988-aa4a-d9175247b6ca" />

---

##  使用技術

### フロントエンド
- React
- TypeScript

### バックエンド
- Node.js
- TypeScript



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

### 3. アプリケーションへのアクセス

http://localhost:3000


