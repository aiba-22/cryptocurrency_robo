FROM node:17.4.0-alpine

# アプリケーションディレクトリを作成
WORKDIR /usr

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

COPY . .

# アプリケーションのポートを設定
EXPOSE 3001

# 並列で server.js と batch.js を実行
CMD npm start &  node src/batch.js
