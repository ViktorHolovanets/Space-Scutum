# Dockerfile for Vue with Vite

# Use an official Node.js runtime as a parent image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

EXPOSE 8080

# Start the app
CMD ["npm", "run", "serve"]
