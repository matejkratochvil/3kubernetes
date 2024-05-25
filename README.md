# 2 node cluster - app deployment

Example app:
    Front-end: A React application providing the user interface.
    Back-end: A Node.js application handling business logic and API requests.
    Database: A MongoDB database storing application data.

## Define the Kubernetes Cluster

1. Install Minikube(<https://minikube.sigs.k8s.io/docs/start/>) and kubectl (<https://kubernetes.io/docs/tasks/tools/>)
2. Start Minikube with Two Nodes

    ```bash
    minikube start --nodes=3
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
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml
kubectl apply -f k8s/node-backend-deployment.yaml
kubectl apply -f k8s/node-backend-service.yaml
kubectl apply -f k8s/react-deployment.yaml
kubectl apply -f k8s/react-service.yaml
kubectl apply -f k8s/nginx-configmap.yaml
kubectl apply -f k8s/nginx-deployment.yaml
kubectl apply -f k8s/nginx-service.yaml
```

## Verify distribution across nodes

```bash
kubectl get pods -o wide
```

You should see the pods distributed across the three nodes.

```bash
~/kubernetess/3kubernetes docker_compose +1 !5 ?2 > kubectl get pods -o wide                                                                                                                 13:10:32

NAME                              READY   STATUS    RESTARTS   AGE     IP           NODE           NOMINATED NODE   READINESS GATES
mongo-76f46d696c-m656d            1/1     Running   0          4m34s   10.244.2.2   minikube-m03   <none>           <none>
nginx-86479456fb-r8vm2            1/1     Running   0          4m33s   10.244.1.3   minikube-m02   <none>           <none>
node-backend-b6bd69b69-dj99q      1/1     Running   0          4m34s   10.244.1.2   minikube-m02   <none>           <none>
react-frontend-869b9cc95c-4z87h   1/1     Running   0          4m34s   10.244.0.3   minikube       <none>           <none>
```

## Rolling update 
The rolling update is without downtime. The new version of the application is deployed to the cluster, and the old version is gradually replaced with the new version. The only risk are the database data in mongodb. We will ignore that for this moment. 
```bash
# Update the Deployment:
# perform a change in the deployment.yaml file

#apply the changes
kubectl apply -f deployment.yaml

#monitor the rollout
kubectl rollout status deployment/my-app

```
