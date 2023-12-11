# specify the node base image with your desired version node:<version>
FROM node:lts
WORKDIR /app

ENV PORT=8080
ENV HOST=0.0.0.0

COPY package*.json ./

RUN npm install

COPY . .

# Database Config
ENV DB_DATABASE=palomade_api
ENV DB_HOST=35.222.74.129
ENV DB_USER=root
ENV DB_PASSWORD=12345678

# Server Config
ENV SECRET_KEY=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMTQzMDU0OCwiaWF0IjoxNzAxNDMwNTQ4fQ.EDKkPCL9VWXHGBwIOaefJsBGyPnpPeQkda8Ff2Ijru8

# HashIds
ENV HASH_KEY=polamade

EXPOSE 8080
CMD [ "npm", "run", "start"]