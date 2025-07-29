#!/bin/sh

echo "Waiting for DB at $DB_HOST:$DB_PORT..."

# Wait for the database port to open
until nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

echo "DB is up. Starting app..."
exec npm run start
