FROM node:17.4.0-alpine

# アプリケーションディレクトリを作成
WORKDIR /usr

# package.jsonとpackage-lock.jsonをコピー
COPY . .

# 依存関係をインストール
RUN npm install


# アプリケーションのポートを設定
EXPOSE 3000

# デフォルトの実行コマンド
CMD ["npm", "start"]
