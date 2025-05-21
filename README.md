暗号通貨の価格を監視し、アラート通知や自動取引を行うシステムです。


---


##  主な機能

###  価格アラート
- 任意の価格条件を設定し、条件に達したときにLINEに通知する
<img width="1435" alt="スクリーンショット 0007-05-21 14 17 22" src="https://github.com/user-attachments/assets/c908b2da-6de4-41da-b123-e922339ca5b5" />

###  自動取引
- 売買条件を設定し、条件達成時に自動で注文する
- 注文結果（成功/失敗）をLINEに通知する
<img width="1420" alt="スクリーンショット 0007-05-21 14 17 03" src="https://github.com/user-attachments/assets/7b84bd6f-bf0c-4024-9526-b42c0c280183" />

### 各種設定
- LINE通知するためのMessagingAPIのキー情報を設定。
- 自動取引用のGMOコインAPIのキー情報を設定。
<img width="1421" alt="スクリーンショット 0007-05-21 14 17 40" src="https://github.com/user-attachments/assets/e69dd499-61cf-4832-90cf-d4846f16ea78" />

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


