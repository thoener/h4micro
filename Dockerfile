FROM node:10.15.3

WORKDIR /app
ENV NODE_ENV production

COPY package.json yarn.lock ./

RUN yarn --production

COPY .env.example /app/.env
COPY . .

CMD ["yarn","run", "start"]

EXPOSE 50051
