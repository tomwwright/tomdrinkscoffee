#!/bin/bash

NOW=$(date +%s)
EXPIRY=$(($NOW + 31536000)) # 1 year

echo "[+] Updating API Key expiry: $EXPIRY"

aws appsync update-api-key --api-id jt3blw4hirbofastsqjm6dfb3e --id da2-2vm2rdfyqjfmxdlxcunnbpkzoq --expires $EXPIRY