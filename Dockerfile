FROM node:8.11.2

WORKDIR /opt/mdjotter

COPY dist/ .
COPY node_modules/ node_modules/
COPY package.json .
COPY package-lock.json .

CMD npm run start:prod