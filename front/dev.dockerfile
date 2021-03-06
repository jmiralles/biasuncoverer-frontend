FROM node:10-alpine

RUN mkdir /usr/front
WORKDIR /usr/front
COPY package.json yarn.lock ./
RUN yarn 
ENTRYPOINT yarn dev