FROM node:23-slim

WORKDIR /app
COPY package*.json ./
RUN yarn install

COPY src ./src/

COPY tsconfig.json ./
CMD ["yarn", "start"]
