const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/app-path");

const filePath = path.join(rootDir, "data", "cart.json");

class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.count += 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, count: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice += +productPrice;

      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log("---cart---", err);
      });
    });
  }
}

module.exports = Cart;
