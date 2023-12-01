FROM node:18 as build

WORKDIR /usr/app

COPY ./backend /usr/app

RUN pnpm install

RUN pnpm uninstall bcrypt
RUN pnpm install bcrypt --build-from-source

EXPOSE 3001

CMD ["npm", "start"]