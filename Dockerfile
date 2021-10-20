FROM node:14.17.6-slim

WORKDIR /opt/node-app

COPY package*.json /opt/node-app/
RUN npm install
EXPOSE 80 
# create .env file with URL variable before running this 
COPY .env /opt/node-app/.env
COPY .env.test /opt/node-app/.env.test
# copy all files to working directory
COPY . /opt/node-app/
CMD node server.js