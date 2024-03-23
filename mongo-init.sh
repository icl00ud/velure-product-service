set -e

mongo <<EOF
db = db.getSiblingDB('$MONGO_INITDB_DATABASE')

db.createUser({
  user: '$NORMAL_USER',
  pwd: '$NORMAL_USER_PASSWORD',
  roles: [{ role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }],
});

db.createCollection('products')

EOF
