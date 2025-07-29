#!/bin/sh

echo "Waiting for PD & Kafka..."

until nc -z pd 2379 && nc -z kafka 9092; do
  echo "Still waiting for pd:2379 and kafka:9092..."
  sleep 2
done

echo "Creating TiCDC changefeed..."
cdc cli changefeed create \
  --pd=http://pd:2379 \
  --sink-uri="kafka://kafka:9092/tidb_cdc_topic?partition-num=1&protocol=canal-json" \
  || echo "Changefeed may already exist."

echo "Starting CDC consumer..."
exec node index.js
