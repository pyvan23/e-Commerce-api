const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      require: true,
      minlength: 7,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
/* we need a system to generate authentication 
tokens every time a new user registers or login.*/
//we’ll have access to every instance of the user model using
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { __id: user.__id.toString() },
    process.env.JWT_SECRET
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
