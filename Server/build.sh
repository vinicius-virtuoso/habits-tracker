#!/usr/bin/env bash
# exit on error
set -o errexit

npm run
npm run build
npx prisma migrate dev --name init