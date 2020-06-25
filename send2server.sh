#!/usr/bin/env bash
echo "Uploading angular app"
scp -r dist trv_front:/home/admintrv/angular-app-prod/staging
