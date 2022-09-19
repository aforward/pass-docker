FROM node:14-alpine3.15

WORKDIR "/usr/app"

COPY ./package.json ./

RUN yarn install

COPY . .

EXPOSE 80 443

CMD ["yarn", "run", "start"]
