# Stage 0, based on Node.js, to build and compile Angular
FROM node:10.4 as node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
ARG env=production
RUN npm run build -- --prod --configuration $env

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15-alpine
MAINTAINER Marko Urm <markourm@gmail.com>
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf