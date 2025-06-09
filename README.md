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
#### 定量トレード
- 概要
  - 売買条件を設定し、条件達成時に自動で注文する
- 設定できる条件
  - 買い注文
    - 有効化 or 無効化
    - 目標価格
    - 数量  
  - 売り注文
    - 有効化 or 無効化
    - 目標価格
    - 数量
  <img width="390" alt="スクリーンショット 0007-06-08 15 42 35" src="https://github.com/user-attachments/assets/cd21ac02-60a1-4a0c-bbbd-95ee36a7eed5" />



#### 可変トレード
- 概要
  - 基準価格から売買設定の割合率に達した時に自動で注文する。基準価格は売買成功した価格に都度更新される
- 設定できる条件
  - 有効化 or 無効化
  - 基準価格
  - 買い注文
    - 下落率
    - 数量率
  - 売り注文
    - 上昇率
    - 数量率
  <img width="387" alt="スクリーンショット 0007-06-08 15 41 43" src="https://github.com/user-attachments/assets/5bf569f3-5345-4578-8c20-18f9700858c6" />




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

git clone https://github.com/aiba-22/cryptocurrency_robo.git

### 2. Docker コンテナのビルドと起動

docker-compose up

### 3. アプリケーションへのアクセス

http://localhost:3000


