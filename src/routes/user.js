const express = require("express");
const router = express.Router();
const User = require("../model/user");

// we are ready to use this method,generateAut...
router.post("/user", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(express);
  }
});
//user route file to create an endpoint for logging in users.
router.post("/user/login", async (req, res) => {
  try {
    //findByCredentials method that we defined earlier to find the user
    const user = await User.findByCredentials(
      req.body.Email,
      req.body.password
    );
    //we generate a token for this session and send back the user and the token.
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
