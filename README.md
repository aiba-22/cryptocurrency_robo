暗号通貨の価格を監視し、アラート通知や自動取引を行うシステムです。


---


##  主な機能

###  価格アラート機能
- 概要
  - 通知の条件を設定、一定時間レート情報をチェックし、条件に達した時にLINEに通知を行う
- 設定できる条件
  - 対象通貨
  - 目標価格
  - 価格が上回った場合 or 下回った場合
- その他
  - 選択した通貨に対して、最新のレート情報を表示する
<img width="843" alt="スクリーンショット 0007-05-21 14 20 45" src="https://github.com/user-attachments/assets/8a7cebe6-6bab-4f4c-aa26-4a550c1946ad" />


###  自動取引機能
- 概要
  - 売買条件を設定し、条件達成時に自動で注文する、注文結果（成功/失敗）をLINEに通知する
- 設定できる条件
  - 買い注文
    - 有効化 or 無効化
    - 目標価格
    - 数量  
  - 売り注文
    - 有効化 or 無効化
    - 目標価格
    - 数量 
- その他
  - 選択した通貨に対して、最新のレート情報を表示する
  
<img width="829" alt="スクリーンショット 0007-05-21 14 20 00" src="https://github.com/user-attachments/assets/2e14f41c-aa7e-4988-aa4a-d9175247b6ca" />

### 各種設定機能
- 概要
  - 自動売買とLINE通知に必要な設定を行うための画面
- 設定項目
  - LINE
    - LINEトークン
    - LINEユーザーID
  - GMO
    - APIキー
    - シークレットキー
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


