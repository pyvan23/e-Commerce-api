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
////Generate auth token
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
/*login in users,we’ll add a static function that’ll fetch a user 
based on their email and password, we’ll later use this while building the login route.*/
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to log in");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};
/*Mongoose provides us with a “pre” middleware which runs before any action we specify.
  Here, we’ll be choosing the “save” action*/
//Hash plain password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
