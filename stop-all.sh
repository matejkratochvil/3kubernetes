# Step 1: Delete all Deployments
kubectl delete deployment --all

# Step 2: Delete all ReplicaSets
kubectl delete rs --all

# Step 3: Delete all StatefulSets
kubectl delete statefulset --all

# Step 4: Delete all Pods
kubectl delete pods --all --now
