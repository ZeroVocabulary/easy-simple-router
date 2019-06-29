var express = require('express');

function createRoute(router, path, func){
  let split = path.split(" ");
  let types = split[0].toLowerCase().split("/");
  let url = split.slice(1).join(" ");

  let route = router.route(url);
  // https://github.com/nodejs/node-v0.x-archive/blob/v0.10.29/deps/http_parser/http_parser.h#L87-119
  // I think express uses this, it depends on the library:
  // https://github.com/jshttp/methods/blob/master/index.js
  // I'm just going to run it instead of using a switch.
  // there shouldn't be any injection issue
  for (let i = 0; i < types.length; i++){
    route[types[i]](func);
  }
}

function handleRoute(router, path, myFunc){
  if (print)
    console.log(path);
  if (myFunc.length <= 1){ // json
    createRoute(router, path, async function(req, res, next){
      let j2 = {};
      for (let key in req.body)
        j2[key] = req.body[key];
      for (let key in req.params)
        j2[key] = req.params[key];
      for (let key in req.query)
        j2[key] = req.query[key];
      res.json(await myFunc(j2));
    });
  }else if (myFunc.length === 2){ // req, res. Doesn't need to be included but whatever.
    createRoute(router, path, function(req, res, next){
      myFunc(req, res);
    });
  }else if (myFunc.length === 3){ // req, res, next
    createRoute(router, path, function(req, res, next){
      myFunc(req, res, next);
    });
  }
};


const rec = (j) => {
  let router = express.Router();
  for (let i in j) {
    let type = typeof (j[i]);
    if (type === "object") {
      if (i[0] == "/"){
        router.use( i, rec(j[i]) );
      }else{
        if (JSON.parse(j[i]["versioned"]) === true){
          let req = j[i]["target"];
          if (typeof(req) === "function"){
            throw "Do not give a function for versioned. Give an object containing functions named v1, v2, etc";
          }
          for (exp in req){
            /* //this is unnecessary:
            if ( exp[0] === "_"){
              continue;
            }*/

            // If someone uses a file per endpoint with export.v1, export.v2, they might forget and add another one they want to call from inside the program
            // If they do that it would be exposed on api, so I guess it would be good to warn them.
            // if the exports's/function's name is NOT in the v(num)(blablabla) format such as "v5", then warn.
            // A version that is like v1_0_2 will still work because it only checks that the 2nd character is a number
            // (isNaN is a bit weird but it should be fine)
            if ( !(exp[0] === "v" && !isNaN(exp[1])) ){
              if (print)
                console.log("[Easy Simple Router] Warning: Abnormal version function name \"" + exp + "\" for route " + i + ". (Adding anyway)");
            }
            let myFunc = req[exp];
            let path = i+"/"+exp;
            handleRoute(router, path, myFunc);
          }
        }else{
          let myFunc  = j[i]["target"];
          handleRoute(router, i, myFunc);
        }
      }
    } else if (type === "string") {
      if (print)
        console.log(i);
      createRoute(router, i, function(req, res){
        res.send(j[i]);
      });
    } else if (type === "function") {
      handleRoute(router, i, j[i]);
    } else {
      throw "Invalid type: " + type + " for " + j[i];
    }
  }
  return router;
};

var print;
module.exports = function (j, verbose=false) {
  print = verbose;
  return rec(j);
};
