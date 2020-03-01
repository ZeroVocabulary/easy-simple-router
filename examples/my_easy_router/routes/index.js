var express = require('express');
var router = express.Router();

const multiplyNumbers = function(req, res){
  product = req.body.num1 * req.body.num2;
  res.send(product.toString());
};

const addNumbers = (req, res) => {
  sum = req.body.num1 + req.body.num2;
  res.send(sum.toString());
};

sendMessage = (msg) => (req, res) => res.send(msg);
routes = {
  "/": {
    "GET /": sendMessage("This is my api"),
    "/math": {
      "GET /": sendMessage("This does math"),
      "POST /multiply-numbers": multiplyNumbers,
      "POST /add-numbers": addNumbers,
    },
  },
  "ALL *": sendMessage("Invalid Route")
};
router.use( "/", require("../../index")(routes) );

module.exports = router;
