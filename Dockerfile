FROM node
WORKDIR /app
COPY ./app .
RUN npm install node-telegram-bot-api
RUN npm install
CMD ["node", "translatorApp.js"]
