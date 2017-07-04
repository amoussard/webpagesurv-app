FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
COPY tsconfig.aot.json /usr/src/app/
COPY tsconfig.json /usr/src/app/
COPY webpack.config.dev.js /usr/src/app/
COPY webpack.config.common.js /usr/src/app/
COPY assets /usr/src/app/assets
RUN npm install
RUN npm run build-prod
RUN rm -rf tsconfig.aot.json tsconfig.json webpack.config.dev.js webpack.config.common.js

# Bundle app source
COPY bin /usr/src/app/bin
COPY public /usr/src/app/public
COPY routes /usr/src/app/routes
COPY views /usr/src/app/views
COPY app.js /usr/src/app/

EXPOSE 3000
CMD [ "npm", "start" ]