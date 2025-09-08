# -------------------------------
# Build Stage
# -------------------------------
FROM node:18-alpine AS builder

# Install build tools for native deps (bcrypt, prisma, etc.)
RUN apk add --no-cache python3 make g++ bash

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install all deps (including dev for building)
RUN npm install

# Copy app source
COPY . .

# Build Next.js app
RUN npm run build

# -------------------------------
# Production Stage
# -------------------------------
FROM node:18-alpine AS production

WORKDIR /app

# Copy only required files
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Set environment
ENV NODE_ENV=production

# Expose Next.js default port
EXPOSE 3000

# Run production server
CMD ["npm", "start"]
