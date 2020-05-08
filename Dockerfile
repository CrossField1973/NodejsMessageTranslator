FROM node
WORKDIR /app
COPY ./app .
RUN npm install mysql ibm-watson
RUN npm install
CMD ["node", "translatorApp.js"]
