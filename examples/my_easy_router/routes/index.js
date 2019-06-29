var express = require('express');
var router = express.Router();

// This function takes only 1 arg,
// ...so easy-simple-router will give it json with all req.params, req.query, req.body values included
// It will then return a json object, which easy-simple-router will send out with res.json()
// This is nice because this way the function can be easily used from inside the project.
// If this function took 2 or 3 args it would get the normal (req, res, next) args instead
const multiplyNumbers = function(j){
  try{
    let x = 1;
    for (let key in j)
      x *= j[key];
    return {"data":{"answer":x}};
  }catch(err){
    return {"error":err};
  }
};

routes = {
  "/": {
    "GET /": "This is my api.", // if you give a string it will be sent
    "/math": {
      "GET /": "This does math.",
      "GET/POST /multiply-together": multiplyNumbers, // if you give a function it will be called
      "GET/POST /add-together": {target:require("./../controllers/addNumbers"), versioned:"true"}, // this is for versioning
      "GET/POST /divide": {target:require("./../controllers/myController").divide, versioned:"true"},
    },
  },
  // if your function takes 0 or 1 arguments it will be given json and what it returns will be sent as json
  "ALL *": () => ({ errors: [{ msg: "Invalid Route" }] })
};
router.use( "/", require("easy-simple-router")(routes, verbose=true) );

module.exports = router;
