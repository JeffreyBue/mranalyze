# Use Node.js 18 Alpine for consistency with website
FROM node:18-alpine

# Add build arguments
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# Install system dependencies for Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    udev \
    ttf-opensans

# Tell Puppeteer to skip installing Chromium and use system version
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (skip devDependencies in production)
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm ci --only=production; \
    else \
      npm install; \
      npm install -g nodemon; \
    fi

# Copy application code
COPY . .

# Create directories for reports and locks
RUN mkdir -p /app/shared-data/reports /app/shared-data/completed_reports /app/shared-data/locks

# Expose API port
EXPOSE 3001