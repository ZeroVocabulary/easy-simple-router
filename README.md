# Easy Simple Router
This package was made to make adding routes easy and simple.
```js
routes = {
  "/": {
    "GET /": "This is my api.", // if you give a string it will be sent
    "/math": {
      "GET /": "This does math.",
      "GET/POST /multiply-together": multiplyNumbers, // if you give a function it will be called
      "GET/POST /add-together": {target:require("./../controllers/addNumbers"), versioned:true}, // this is for versioning
      "GET/POST /divide": {target:require("./../controllers/myController").divide, versioned:true},
    },
  },
  // if your function takes 0 or 1 arguments it will be given json (params, body, query values)
  // and what it returns will be sent as json
  "ALL *": () => ({ errors: [{ msg: "Invalid Route" }] })
};
router.use( "/", require("easy-simple-router")(routes, verbose=true) );
```
## Getting Started
### Install
```
npm install easy-simple-router
```
### Usage
The image above mostly explains it.
* You can put any number of http verbs by seperating them with / Ex. GET/POST.
* If given a string, it will send that string (res.send).
* If given a function, it will run it with arguments. If the function takes 2 or more arguments it will be sent req, res, next as normal. If the function takes 0 or 1 arguments then it is a "json function" and it will be given json with the params, body, and query parameters thrown in, and what it returns will be sent as json (res.json). See the examples if you want to know how that works.
* If given an object it will run the target function with whatever options are given. There is only one option at the moment ("versioned").
  * versioned: If versioned, the target should instead point to an object with functions named v1, v2, v3, v1_2_3, v1blablabla, etc. Then the user will access endpoint/version to use the endpoint. For example: account/create-account/v2. This feature was added because I found it useful for microservices. I make a file per function, and export each version, using the json function feature so that it can be called from within the project

```js
module.exports.v1 = function(j){
    let total = 0;
    for (let key in j){
        total += parseInt(j[key]);
    }
    return {"total":total};
};

// Oh no, I forgot about floats! I better make a new version
module.exports.v2 = function(j){
    let total = 0;
    for (let key in j){
        total += parseFloat(j[key]);
    }
    return {"data":{"total":total}};
};
```
## Updates
I don't intend to update this ever. I MIGHT update it if you find a security issue or have a good feature but I'd rather not worry about it and its supposed to be a simple router anyway.