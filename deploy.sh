#!/bin/bash

echo "==================================================="
echo "  Gold Star — Mac/Linux Automated Deployment Script"
echo "==================================================="
echo

# 1. Creating backup of development index.html
echo "1. Creating backup of development index.html..."
cp index.html index.html.dev

# 2. Running production build
echo "2. Running production build..."
npm run build
if [ $? -ne 0 ]; then
    echo
    echo "[ERROR] Build failed! Aborting deployment."
    rm -f index.html.dev
    exit 1
fi

# 3. Copying compiled files to root directory
echo "3. Copying compiled files to root directory..."
cp dist/index.html ./index.html
mkdir -p assets
cp -R dist/assets/ ./assets/

# 4. Staging and committing compiled assets to Git
echo "4. Staging and committing compiled assets to Git..."
git add index.html assets
git commit -m "deploy: update compiled production build for Hostinger static serving"

# 5. Force-pushing production assets to main branch
echo "5. Force-pushing production assets to main branch..."
git push origin main

# 6. Restoring local development environment
echo "6. Restoring local development environment..."
mv index.html.dev ./index.html

echo
echo "==================================================="
echo "  [SUCCESS] Deployment completed successfully!"
echo "  Hostinger will now serve the compiled site."
echo "==================================================="
