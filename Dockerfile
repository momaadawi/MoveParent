FROM node:16.19.0-alpine3.17 AS moveparent
RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/
RUN npm config set strict-ssl false \
  && npm install --legacy-peer-deps

COPY . /app/
RUN npm run build

# server stage
FROM nginx:alpine
COPY --from=moveparent /app/dist/MoveParent /usr/share/nginx/html



