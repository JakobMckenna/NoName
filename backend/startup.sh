#!/bin/bash

echo "Waiting for MySQL to be ready..."
# Wait for MySQL to be available
/usr/local/bin/wait-for-it.sh -t 45 localhost:3306
echo "Waiting for MySQL to be ready..."

# Run Prisma migration
npx prisma migrate dev --schema prisma/schema.prisma
npx prisma db push
npm run postinstall

# Build the project
npm run build

# Start the application
npm run start