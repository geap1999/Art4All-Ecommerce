FROM node:16-alpine

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

CMD ["npm", "run", "dev", "--host", "0.0.0.0", "--port", "5173"]
