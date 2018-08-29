# Stage 0, based on Node.js, to build and compile Angular
FROM node:10.4 as node

# install and cache app dependencies
WORKDIR /app
COPY package.json /app/
RUN npm install

# add app
COPY ./ /app/
ARG env=production
RUN npm run build -- --prod --configuration $env

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:stable-alpine
MAINTAINER Marko Urm <markourm@gmail.com>

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=node /app/dist /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/bioevo.conf
