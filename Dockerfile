FROM node:16-alpine

WORKDIR /app

COPY src /app/src
COPY node_modules /app/node_modules
COPY package.json /app

EXPOSE 8080
CMD ["npm", "run", "start"]
