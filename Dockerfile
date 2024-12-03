FROM node:22.5.1

WORKDIR /app
COPY package*.json ./
RUN yarn install

COPY src ./src/

COPY tsconfig.json ./
CMD ["yarn", "start"]
