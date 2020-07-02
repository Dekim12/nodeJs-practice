const mongodb = require("mongodb");

const { getDatabase } = require("../utils/database");

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart; //{items: []}
    this._id = new mongodb.ObjectId(id);
  }

  save() {
    const db = getDatabase();

    return db.collection("users").insertOne(this);
  }

  addProductToCart(product) {
    const db = getDatabase();
    let updatedCart;

    const productIndex = this.cart.items.findIndex(
      (item) => item.productId.toString() === product._id.toString()
    );

    if (productIndex < 0) {
      updatedCart = {
        items: [
          ...this.cart.items,
          { productId: new mongodb.ObjectId(product._id), quantity: 1 },
        ],
      };
    } else {
      this.cart.items[productIndex].quantity += 1;

      updatedCart = { ...this.cart };
    }

    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  getCartProducts() {
    const db = getDatabase();

    const productIds = this.cart.items.map((item) => item.productId);

    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((prod) => {
          const quantity = this.cart.items.find(
            (item) => item.productId.toString() === prod._id.toString()
          ).quantity;

          return { ...prod, quantity };
        });
      });
  }

  deleteProductFromCart(productId) {
    const db = getDatabase();

    const updatedItems = this.cart.items.reduce((result, item) => {
      let preparedItem = { ...item };

      if (item.productId.toString() === productId) {
        if (item.quantity === 1) {
          return result;
        }

        preparedItem = { ...item, quantity: item.quantity - 1 };
      }

      return [...result, preparedItem];
    }, []);

    return db
      .collection("users")
      .updateOne(
        { _id: this._id },
        { $set: { cart: { ...this.cart, items: updatedItems } } }
      );
  }

  addCartToOrder() {
    const db = getDatabase();

    return this.getCartProducts()
      .then((products) => {
        const totalPrice = products.reduce((count, prod) => {
          return count + prod.quantity * +prod.price;
        }, 0);

        const order = {
          items: products,
          user: {
            _id: this._id,
            name: this.name,
          },
          totalPrice,
        };

        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { ...this.cart, items: [] };

        return db
          .collection("users")
          .updateOne({ _id: this._id }, { $set: { cart: this.cart } });
      });
  }

  getOrders() {
    const db = getDatabase();

    return db.collection("orders").find({ "user._id": this._id }).toArray();
  }

  static findById(id) {
    const db = getDatabase();

    return db.collection("users").findOne({ _id: new mongodb.ObjectId(id) });
  }
}

module.exports = User;
