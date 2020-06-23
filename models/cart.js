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

  static deleteProduct(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        console.log("---- delete cart error");

        return;
      }
      const cart = JSON.parse(fileContent);
      const productIndex = cart.products.findIndex((prod) => prod.id === id);

      if (productIndex !== -1) {
        const price = cart.products[productIndex].count * productPrice;
        cart.totalPrice -= price;

        cart.products = cart.products.filter((prod) => prod.id !== id);

        fs.writeFile(filePath, JSON.stringify(cart), (err) => {
          console.log("---cart---", err);
        });
      }
    });
  }

  static getCart(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        console.log("-------", err);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  }
}

module.exports = Cart;
