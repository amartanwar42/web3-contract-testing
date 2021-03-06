FROM node:16.3.0-alpine
LABEL maintainer="amar"

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

CMD npx hardhat run  scripts/deploy-script.js

