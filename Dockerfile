FROM node
WORKDIR $Home/app/
COPY ./app ./
RUN npm install pm2 -g
RUN npm install
CMD ["pm2-runtime", "translatorApp.js"]
