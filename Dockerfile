# Use an official Node runtime as a parent image
FROM node:20.10.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Load environment variables
ARG DATABASE_URL

# Copy package.json files and other configuration files needed for pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy the 'packages' directory
COPY packages/ packages/

# Copy the 'apps/server' directory
COPY apps/server/ apps/server/

# Install dependencies globally and for all workspaces
RUN npm install -g pnpm turbo typescript && \
    pnpm install --frozen-lockfile

# Build the packages first
RUN turbo run build --filter=mp-prisma --filter=mp-validation

# Migrate the database
RUN turbo run migrate --filter=mp-prisma

# Then, build the server
RUN turbo run build --filter=server

# Expose the port the server listens on
EXPOSE 80

# Run migration and server
CMD ["sh", "-c", "turbo run start"]
