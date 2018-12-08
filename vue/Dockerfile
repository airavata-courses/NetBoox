FROM node:8.12.0

RUN git clone -b 7-integrating-project1-microservices-with-frontend https://github.com/airavata-courses/NetBoox.git

WORKDIR /NetBoox/frontend/project1/

Run npm install

RUN npm run build

EXPOSE 30000

CMD [ "npm", "start" ]