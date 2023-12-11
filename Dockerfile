# Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18-bullseye-slim

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the content of the local src directory to the working directory
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 9000

# Define environment variable
ENV NODE_ENV=production

# Database Config
ENV DB_DATABASE=palomade-api
ENV DB_HOST=34.28.37.233
ENV DB_USER=root
ENV DB_PASSWORD=12345678
ENV PORT=2002
ENV SECRET_KEY=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMTQzMDU0OCwiaWF0IjoxNzAxNDMwNTQ4fQ.EDKkPCL9VWXHGBwIOaefJsBGyPnpPeQkda8Ff2Ijru8

ENV MAIL_HOST="mail.hafizcaniago.my.id"
ENV MAIL_PORT=465
ENV MAIL_SECURE=true
ENV MAIL_USER=palomade@hafizcaniago.my.id
ENV MAIL_PASSWORD=palomade123

# Run the application
CMD ["npm", "start"]