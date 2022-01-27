const express = require("express");
const app = express();

require("./db/mongoose");

//setting
app.use(express.json());

//port
const port = process.env.PORT;

//midddelwares

//routes

//listening port

app.listen(port, () => {
  console.log(`The server is on port ${port}`);
});
