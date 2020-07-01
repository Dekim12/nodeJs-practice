const mongodb = require("mongodb");

const { getDatabase } = require("../utils/database");

class Product {
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = new mongodb.ObjectId(id);
  }

  update() {
    const db = getDatabase();

    return db
      .collection("products")
      .updateOne({ _id: this._id }, { $set: this });
  }

  save() {
    const db = getDatabase();

    return db.collection("products").insertOne(this);
  }

  static fetchAll() {
    const db = getDatabase();

    return db.collection("products").find().toArray();
  }

  static findById(id) {
    const db = getDatabase();

    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next();
  }

  static deleteById(id) {
    const db = getDatabase();

    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) });
  }
}

module.exports = Product;
