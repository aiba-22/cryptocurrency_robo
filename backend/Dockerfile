FROM node:14

# アプリケーションディレクトリを作成
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# ポートをエクスポート
EXPOSE 3001

# アプリケーションを起動
CMD ["npm", "start"]
