#!/bin/sh

# Seed the database if it's the first time
npx prisma db push --accept-data-loss
npx prisma db seed

# Start the application
node dist/index.js
