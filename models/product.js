const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/app-path");

const filePath = path.join(rootDir, "data", "products.json");

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  update(products) {
    const currentProductIndex = products.findIndex(
      (prod) => prod.id === this.id
    );
    products[currentProductIndex] = this;
  }

  save() {
    fs.readFile(filePath, (err, fileContent) => {
      let products = [];

      if (!err) {
        products = JSON.parse(fileContent);
      }

      if (this.id) {
        this.update(products);
      } else {
        this.id = Math.floor(Math.random() * 100000).toString();
        products.push(this);
      }

      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log("------", err);
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  }

  static findById(prodId, cb) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        cb();
      } else {
        const product = JSON.parse(fileContent).find(
          (prod) => prod.id === prodId
        );
        cb(product);
      }
    });
  }
}

module.exports = Product;
