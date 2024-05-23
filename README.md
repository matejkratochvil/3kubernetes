# 2 node cluster - app deployment

Example app:
    Front-end: A React application providing the user interface.
    Back-end: A Node.js application handling business logic and API requests.
    Database: A MongoDB database storing application data.

## Define the Kubernetes Cluster

1. Install Minikube(<https://minikube.sigs.k8s.io/docs/start/>) and kubectl (<https://kubernetes.io/docs/tasks/tools/>)
2. Start Minikube with Two Nodes

    ```bash
    minikube start --nodes=2
    ```

## Build and Push Docker Images

Navigate to the directories containing the Dockerfiles and run the following commands:

```bash
# For the React front-end
# (cd frontend)
docker build -t my-docker-repo/react-frontend:latest .
# For the Node.js back-end
# (cd backend)
docker build -t my-docker-repo/node-backend:latest .
```

Push the Docker Images to Docker Hub:
Make sure you are logged in to Docker Hub using docker login.

```bash
# For the React front-end
docker push my-docker-repo/react-frontend:latest
# For the Node.js back-end
docker push my-docker-repo/node-backend:latest
```

## Deploy to Kubernetes

```bash
# (from project root)
kubectl apply -f k8s/react-deployment.yaml
kubectl apply -f k8s/react-service.yaml
kubectl apply -f k8s/node-backend-deployment.yaml
kubectl apply -f k8s/node-backend-service.yaml
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml
```

## Verify distribution across nodes

```bash
kubectl get pods -o wide
```
