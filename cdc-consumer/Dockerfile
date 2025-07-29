FROM node:20

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./
RUN npm install


COPY . .

RUN chmod +x ./init.sh

CMD ["/bin/sh", "./init.sh"]
