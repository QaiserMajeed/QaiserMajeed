FROM node:14-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/node/app

COPY . .

RUN npm install

EXPOSE 4400

CMD [ "node", "app.js" ]