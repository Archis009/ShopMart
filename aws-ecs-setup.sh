#!/bin/bash

# ==============================================================================
# AWS ECR & ECS Setup Script for ShopMart
# ==============================================================================
# Note: Ensure you have configured your AWS CLI using `aws configure` 
# and have appropriate permissions before running this script.

AWS_REGION="us-east-1"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REPO_NAME="shopmart-server"
ECS_CLUSTER_NAME="shopmart-cluster"
ECS_SERVICE_NAME="shopmart-backend-service"
TASK_FAMILY="shopmart-backend-task"

echo "========================================"
echo "Section 1 -- Amazon ECR Setup"
echo "========================================"

# 1.1 ECR Repo Setup
echo "Creating ECR Repository: $ECR_REPO_NAME..."
aws ecr create-repository \
    --repository-name $ECR_REPO_NAME \
    --region $AWS_REGION \
    --image-scanning-configuration scanOnPush=true \
    --image-tag-mutability MUTABLE

# 1.2 Image Pushed & 1.3 Tagging Strategy
echo "Authenticating Docker to ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

echo "Building and Pushing Initial Image (Tagging Strategy: 'latest' and Git Commit SHA)..."
cd server
docker build -t $ECR_REPO_NAME .
# Tagging with 'latest'
docker tag $ECR_REPO_NAME:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME:latest
# Tagging with a sample commit sha strategy
GIT_SHA=$(git rev-parse --short HEAD || echo "v1.0.0")
docker tag $ECR_REPO_NAME:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME:$GIT_SHA

docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME:$GIT_SHA
cd ..

echo "========================================"
echo "Section 2 -- Amazon ECS Setup"
echo "========================================"

# 2.1 ECS Cluster
echo "Creating ECS Cluster: $ECS_CLUSTER_NAME..."
aws ecs create-cluster \
    --cluster-name $ECS_CLUSTER_NAME \
    --region $AWS_REGION

# 2.2 Task Definition
echo "Registering ECS Task Definition..."
# Note: Ensure ecs-task-definition.json is updated with your AWS Account ID and Execution Role ARN
aws ecs register-task-definition \
    --cli-input-json file://ecs-task-definition.json \
    --region $AWS_REGION

# 2.3 Service Running
echo "Creating ECS Service: $ECS_SERVICE_NAME..."
# Note: Replace subnets and security groups with your actual VPC details
# aws ecs create-service \
#     --cluster $ECS_CLUSTER_NAME \
#     --service-name $ECS_SERVICE_NAME \
#     --task-definition $TASK_FAMILY \
#     --desired-count 1 \
#     --launch-type FARGATE \
#     --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxxxx,subnet-yyyyyyy],securityGroups=[sg-zzzzzzzz],assignPublicIp=ENABLED}" \
#     --region $AWS_REGION

echo "Setup Complete!"
echo "Please update the ECS Service creation command in this script with your VPC Subnets and Security Group IDs before running it."
