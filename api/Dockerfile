# Node.jsの軽量なアルパイン版を使用
FROM node:20-alpine

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# ソースコードをコピー
COPY . .

# 開発用ポートを公開（3001ポート）
EXPOSE 3001

# nodemonを使ってTypeScriptのファイルを監視、変更があればts-nodeで実行
CMD ["sh", "-c", "npm run dev && npm run migrate"]
