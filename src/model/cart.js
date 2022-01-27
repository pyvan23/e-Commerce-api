const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema(
  {
    owner: {
      type: objectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        itemId: {
          type: objectId,
          ref: "Item",
          required: true,
        },
        name: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: Number,
      },
    ],
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
