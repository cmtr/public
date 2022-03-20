# syntax=docker/dockerfile:1

FROM node:16.14.0

ENV STAGE=PROD
ENV NAME=CMTR
ENV PORT=3000

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "app.js" ]