# Build the backend
FROM node:18 as build

# Assurez-vous que le chemin est correct
WORKDIR /usr/app

# Copiez les fichiers backend dans le conteneur
COPY ./backend /usr/app

# Install dependencies
RUN npm install

# Force reinstallation de bcrypt avec les tags appropriés
RUN npm uninstall bcrypt
RUN npm install bcrypt --build-from-source

# Exposez le port nécessaire pour l'application backend
EXPOSE 3000

# Démarrer l'application backend
CMD ["npm", "start"]