FROM node:14.17.6-slim

WORKDIR /opt/node-app

COPY package*.json /opt/node-app/
RUN npm install
EXPOSE 5000
RUN cat >> .env << BASE_URL=www.nihaonumbers.com
# copy all files to working directory
COPY . /opt/node-app/
CMD node server.js