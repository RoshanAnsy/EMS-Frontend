# Use official Node.js image as the base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# -----------------------------------
# Production image
# -----------------------------------
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder
COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/next.config.ts ./
COPY --from=base /app/tsconfig.json ./

# Set environment variable
ENV NODE_ENV=production

# Expose port (default Next.js port)
EXPOSE 3002

# Start the Next.js server
CMD ["npm", "start"]
