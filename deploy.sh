#!/bin/bash

echo "Cleaning ..."
rm -rf dist

echo "Building ..."
npm run build
rm -f dist.tar.gz
tar -czvf dist.tar.gz -C dist .
shasum=$(sha256sum dist.tar.gz | awk '{print $1}' | tr -d '\n')

echo "Deploying archive ..."
gsutil cp dist.tar.gz gs://journey.bokov.me/$shasum/dist.tar.gz

echo "Deploying to server ..."
gcloud compute ssh botondjanoskovacs@bokov-me-website --zone europe-west4-a --command "gsutil cp gs://journey.bokov.me/$shasum/dist.tar.gz /tmp/journey.tar.gz && sudo rm -rf /var/www/journey && sudo mkdir /var/www/journey && cd /var/www/journey && sudo tar -xvf /tmp/journey.tar.gz && rm /tmp/journey.tar.gz"

echo "Done."