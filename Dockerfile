FROM node:10-alpine
RUN mkdir -p /usr/src/app
COPY ./app /usr/src/app/

WORKDIR /usr/src/app
RUN npm install

EXPOSE 3000
CMD node /usr/src/app/index.js
