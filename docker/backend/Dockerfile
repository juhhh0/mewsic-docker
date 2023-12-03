FROM node:18 as build

WORKDIR /usr/app

COPY ./backend /usr/app

RUN npm install -g pnpm
RUN pnpm install

RUN pnpm uninstall bcrypt
RUN pnpm install bcrypt

EXPOSE 3001

CMD ["npm", "start"]