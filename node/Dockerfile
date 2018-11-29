FROM node:8.12.0

RUN git clone -b 5-Microservice-in-Node-JS https://github.com/airavata-courses/NetBoox.git

WORKDIR /NetBoox/

RUN npm install

EXPOSE 4001

CMD [ "node", "server.js" ]