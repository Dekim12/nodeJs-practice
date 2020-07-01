const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

const connectToMongo = (callback) => {
  MongoClient.connect(
    "mongodb+srv://siarhei_1:123698745wasd@cluster0-luq5l.mongodb.net/shopDB?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");

      db = client.db();
      callback();
    })
    .catch((err) => console.log(err));
};

const getDatabase = () => {
  if (db) {
    return db;
  }

  throw "No database found";
};

module.exports = { connectToMongo, getDatabase };
