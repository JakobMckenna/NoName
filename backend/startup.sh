#!/bin/bash

echo "Waiting for MySQL to be ready..."
# Wait for MySQL to be available
/usr/local/bin/wait-for-it.sh -t 45 noname-mysql-1:3306
echo "Waiting for MySQL to be ready..."

# Run Prisma migration
npx prisma migrate dev --schema prisma/schema.prisma
npm run postinstall

# Start your application
npm run dev