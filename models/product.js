const db = require("../utils/database");
const Cart = require("./cart");

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  update(products) {
    // const currentProductIndex = products.findIndex(
    //   (prod) => prod.id === this.id
    // );
    // products[currentProductIndex] = this;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description) VALUES(?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static delete(id) {
    // fs.readFile(filePath, (err, fileContent) => {
    //   if (err) {
    //     console.log("----delete error");
    //   } else {
    //     const products = JSON.parse(fileContent);
    //     const product = products.find((prod) => prod.id === id);
    //     const updatedProducts = products.filter((prod) => prod.id !== id);
    //     Cart.deleteProduct(id, product.price);
    //     fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
    //       console.log("------", err);
    //     });
    //   }
    // });
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(prodId) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [prodId]);
  }
}

module.exports = Product;
