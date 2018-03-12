FROM          node:9.7-alpine

RUN           npm install blink-diff

ADD           app.js app.js

ENTRYPOINT    ["node", "app.js"]
