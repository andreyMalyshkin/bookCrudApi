FROM node:14
ENV PORT 8080
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY .env ./
COPY . .
EXPOSE $PORT
CMD [ "npm", "start" ]