FROM node
WORKDIR /app
COPY ./app .
RUN npm install node-telegram-bot-api -g
RUN npm install
CMD ["node", "translatorApp.js"]
