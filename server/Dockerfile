FROM node:alpine

WORKDIR /app

COPY package*.json .
RUN npm install

ENV PORT=5000
ENV NODE_ENV=development
ENV DATABASE_URL="postgresql://postgres:root@localhost:5432/drizzle_starter"

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "dev"]