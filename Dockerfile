FROM node
WORKDIR /app
COPY ./app .
RUN npm install mysql
RUN npm install
CMD ["node", "translatorApp.js"]
