#!/bin/bash

echo "Cleaning ..."
rm -rf dist

echo "Building ..."
npm run build
rm -f dist.tar.gz
tar -czvf dist.tar.gz -C dist .
shasum=$(sha256sum dist.tar.gz | awk '{print $1}' | tr -d '\n')

echo "Deploying archive ..."
gsutil cp dist.tar.gz gs://ld52.bokov.me/$shasum/dist.tar.gz

echo "Deploying to server ..."
gcloud compute ssh botondjanoskovacs@bokov-me-website --zone europe-west4-a --command "gsutil cp gs://ld52.bokov.me/$shasum/dist.tar.gz /tmp/ld52.tar.gz && sudo rm -rf /var/www/ld52 && sudo mkdir /var/www/ld52 && cd /var/www/ld52 && sudo tar -xvf /tmp/ld52.tar.gz && rm /tmp/ld52.tar.gz"

echo "Done."