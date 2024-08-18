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

```bash
git clone https://github.com/your-repository.git
cd your-repository

### 2. Dockerコンテナのビルドと起動
docker-compose up --build
上記コマンドにより、フロントエンド、バックエンド、バッチサービス、MySQLデータベースがビルドされ、起動されます。

### 3. アプリケーションへのアクセス
http://localhost:8000でフロント画面にアクセス

