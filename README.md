# 仮想通貨通知システム

仮想通貨の現在価格表示機能と、価格の条件指定によるLINEへの通知機能が実装されています。
ゆくゆくは自動取引も視野に入れたい

## 使用技術

- **フロントエンド**:  
  - **React**
  - **JavaScript**と**TypeScript**: 作業時間の関係でTypeScript化できてないところ有り。

- **バックエンド**:  
  - **Node.js/Express**: 
  - **JavaScript**と**TypeScript**: 作業時間の関係でTypeScript化できてないところ有り。

## 開始手順

### 1. リポジトリをクローン

git clone https://github.com/your-repository.git

cd your-repository

### 2. Dockerコンテナのビルドと起動
docker-compose up --build

上記コマンドにより、フロントエンド、バックエンド、バッチサービス、MySQLデータベースがビルドされ、起動されます。

### 3. アプリケーションへのアクセス
http://localhost:8000
でフロント画面にアクセス

### 価格情報画面
<img width="1438" alt="スクリーンショット 0006-08-18 19 12 40" src="https://github.com/user-attachments/assets/53002d8c-d0af-46fa-ac87-7d32cfcb20e2">

### 通知設定画面
<img width="1438" alt="スクリーンショット 0006-08-18 19 12 32" src="https://github.com/user-attachments/assets/e5d8e993-2774-40c9-8ac6-d6453e1abd8c">

