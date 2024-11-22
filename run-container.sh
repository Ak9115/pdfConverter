#!/bin/bash

IMAGE_NAME="your-dockerhub-username/docx-to-pdf"
CONTAINER_NAME="docx-to-pdf-app"
PORT=8080

echo "Pulling the latest Docker image..."
docker pull $IMAGE_NAME

echo "Stopping any running container with the same name..."
docker stop $CONTAINER_NAME && docker rm $CONTAINER_NAME

echo "Running the container..."
docker run -d --name $CONTAINER_NAME -p $PORT:80 $IMAGE_NAME

echo "Application is running at http://localhost:$PORT"
