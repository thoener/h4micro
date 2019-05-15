FROM node:8

WORKDIR /h4micro
ENV NODE_ENV production

COPY package.json yarn.lock ./

RUN yarn --production

COPY .env.example /h4micro/.env
COPY . .
COPY --chown=node:node . .

USER node

ENTRYPOINT ["yarn"]
CMD ["run", "start"]

EXPOSE 50051
