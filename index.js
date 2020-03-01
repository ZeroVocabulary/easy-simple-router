const express = require('express');

module.exports = function (j) {
  return recursivelyAddRoutes(j);
};

function recursivelyAddRoutes (j) {
  let router = express.Router();
  for (let path in j) {
    if (pathProvidesHttpMethods(path)){
      let [methods, url] = getMethodsAndUrlFromRoutePath(path);
      let func = j[path];
      createRoute(router, methods, url, func);
    }else{
      router.use(path, recursivelyAddRoutes(j[path]));
    }
  }
  return router;
};

function pathProvidesHttpMethods(path){
  return path[0] !== "/";
};

function getMethodsAndUrlFromRoutePath(path){
  let split = path.split(" ");
  let methods = split[0].toLowerCase().split("/");
  let url = split.slice(1).join(" ");
  return [methods, url];
};

function createRoute(router, methods, url, func){
  let route = router.route(url);
  for (let i = 0; i < methods.length; i++){
    route[methods[i]](func);
  }
};
