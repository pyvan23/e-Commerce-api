const mongoose = require("mongoose");
/*ObjectID is a unique identifier for every document
  created in mongoDB. We’ll need this to link every item 
  created with the user that created it.*/
const objectId = mongoose.Schema.Types.ObjectId;

const itemSchema = new mongoose.Schema(
  {
    owner: {
      type: objectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
