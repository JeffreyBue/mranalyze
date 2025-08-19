# Use the official Node.js 18 image
FROM node:24.2.0-alpine3.21@sha256:84d000da129e2e2ea545ad9779845a7e457b1472ba01225513a8ed1a222df7dd

# Add build arguments
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies (skip devDependencies in production)
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm ci --only=production; \
    else \
      npm install; \
      npm install -g nodemon; \
    fi

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 8787
EXPOSE 8787