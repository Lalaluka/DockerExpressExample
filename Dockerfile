FROM node:16-alpine

COPY src /app/src
COPY node_modules /app/node_modules
COPY package.json /app

EXPOSE 8080

WORKDIR /app

CMD ["npm", "run", "start"]
