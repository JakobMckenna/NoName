#!/bin/bash

echo "Waiting for MySQL to be ready..."

echo "Waiting for MySQL to be ready..."

# Run Prisma migration
npx prisma migrate dev --schema prisma/schema.prisma

npm run postinstall

# Build the project
npm run build

# Start the application
npm run start