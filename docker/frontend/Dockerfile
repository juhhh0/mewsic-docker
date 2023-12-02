FROM node:16.17.1-alpine3.16 as build

WORKDIR /usr/app/frontend  
COPY ./frontend /usr/app/frontend

RUN pnpm run build


FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/frontend/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/app/frontend/dist /usr/share/nginx/html