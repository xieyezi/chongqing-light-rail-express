

FROM node:20.10.0 AS builder

WORKDIR /app

COPY . /app   

FROM nginx
COPY --from=builder app/dist /usr/share/nginx/html/
COPY --from=builder app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80