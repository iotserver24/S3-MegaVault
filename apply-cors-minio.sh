#!/bin/bash

# Apply CORS configuration to MinIO server
# Replace the placeholders with your actual MinIO server details

MINIO_SERVER="http://your-minio-server:9000"
ACCESS_KEY="YOUR_ACCESS_KEY"
SECRET_KEY="YOUR_SECRET_KEY"
ALIAS_NAME="myminio"

echo "Setting up MinIO CORS configuration..."

# Install MinIO Client if not already installed
if ! command -v mc &> /dev/null; then
    echo "Installing MinIO Client (mc)..."
    curl https://dl.min.io/client/mc/release/linux-amd64/mc -o mc
    chmod +x mc
    sudo mv mc /usr/local/bin/
    echo "MinIO Client installed successfully!"
else
    echo "MinIO Client (mc) is already installed."
fi

# Configure MinIO alias
echo "Configuring MinIO alias..."
mc alias set $ALIAS_NAME $MINIO_SERVER $ACCESS_KEY $SECRET_KEY

# Apply CORS configuration
echo "Applying CORS configuration to MinIO server..."
mc admin config set $ALIAS_NAME/ cors.json

# Restart MinIO server to apply configuration
echo "Restarting MinIO server to apply CORS configuration..."
mc admin service restart $ALIAS_NAME

echo "CORS configuration applied successfully to MinIO!"
echo "Your MinIO server should now allow multipart uploads from any origin."
