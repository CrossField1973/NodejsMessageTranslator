FROM node
WORKDIR $Home/app/
COPY ./app ./
RUN npm install pm2 node-telegram-bot-api -g
RUN npm install
CMD ["pm2-runtime", "translatorApp.js"]
