# Easy Simple Router
This package was made to make adding routes easy and simple.
```js
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
```
## Getting Started
### Install
```
npm install easy-simple-router
```
### Usage
The image above mostly explains it. Extra info
* Put the http method and url as the key (ex. "GET /") and the function you want to call as the value.
* You can put any number of http methods by seperating them with "/" (ex. "GET/POST /").
* If you don't put an http method (ex. "/") you can nest.

