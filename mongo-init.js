function printLargeText(text, numLines) {
  for (let i = 0; i < numLines; i++) {
      console.log(text);
  }
}

var rootUsername = process.env.MONGO_INITDB_ROOT_USERNAME;
var rootPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;

var conn = new Mongo();
var db = conn.getDB("admin");

db.auth(rootUsername, rootPassword);

var dbName = process.env.MONGO_INITDB_DATABASE;
var collectionName = "products";

db = conn.getDB(dbName);
db.createCollection(collectionName);

db.createUser(
  {
    user: rootUsername,
    pwd:  rootPassword,
    roles: [ { role: "readWrite", db: dbName } ]
  }
)

db[collectionName].insertMany([
  { name: "Document 1", description: "This is document 1" },
  { name: "Document 2", description: "This is document 2" },
  { name: "Document 2", description: "This is document 2" },
  { name: "Document 2", description: "This is document 2" },
  { name: "Document 2", description: "This is document 2" },
  { name: "Document 3", description: "This is document 3" }
]);

printLargeText("Database and collection created successfully!", 12);