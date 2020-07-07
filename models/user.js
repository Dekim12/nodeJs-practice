const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addProductToCart = function (product) {
  let updatedCart;
  const productIndex = this.cart.items.findIndex(
    (item) => item.productId.toString() === product._id.toString()
  );

  if (productIndex < 0) {
    updatedCart = {
      items: [...this.cart.items, { productId: product._id, quantity: 1 }],
    };
  } else {
    this.cart.items[productIndex].quantity += 1;
    updatedCart = { ...this.cart };
  }

  this.cart = updatedCart;

  return this.save();
};

userSchema.methods.deleteProductFromCart = function (targetProductId) {
  const updatedItems = this.cart.items.reduce(
    (result, { _id, productId, quantity }) => {
      if (productId.toString() === targetProductId.toString()) {
        if (quantity === 1) {
          return result;
        } else {
          return [...result, { _id, productId, quantity: quantity - 1 }];
        }
      }

      return [...result, { _id, productId, quantity }];
    },
    []
  );

  this.cart.items = updatedItems;

  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };

  return this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;

// const { getDatabase } = require("../utils/database");

// class User {
// constructor(name, email, cart, id) {
//   this.name = name;
//   this.email = email;
//   this.cart = cart; //{items: []}
//   this._id = new mongodb.ObjectId(id);
// }

// addCartToOrder() {
//   const db = getDatabase();
//   return this.getCartProducts()
//     .then((products) => {
//       const totalPrice = products.reduce((count, prod) => {
//         return count + prod.quantity * +prod.price;
//       }, 0);
//       const order = {
//         items: products,
//         user: {
//           _id: this._id,
//           name: this.name,
//         },
//         totalPrice,
//       };
//       return db.collection("orders").insertOne(order);
//     })
//     .then((result) => {
//       this.cart = { ...this.cart, items: [] };
//       return db
//         .collection("users")
//         .updateOne({ _id: this._id }, { $set: { cart: this.cart } });
//     });
// }
// getOrders() {
//   const db = getDatabase();
//   return db.collection("orders").find({ "user._id": this._id }).toArray();
// }
// static findById(id) {
//   const db = getDatabase();
//   return db.collection("users").findOne({ _id: new mongodb.ObjectId(id) });
// }
// }
