FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache python3 make g++ \
  && npm ci --only=production \
  && apk del python3 make g++

RUN npm ci --only=production


COPY src src


FROM node:20-alpine

RUN apk add --no-cache netcat-openbsd

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

COPY ./wait-for-db.sh ./wait-for-db.sh
RUN chmod +x ./wait-for-db.sh

CMD ["sh", "./wait-for-db.sh"]