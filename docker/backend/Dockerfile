FROM node:18 as build

WORKDIR /usr/app

COPY ./backend /usr/app

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3001

CMD ["npm", "start"]