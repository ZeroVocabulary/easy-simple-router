
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


// If you use a file per api, remember not to export anything other than your intended versions, otherwise they can be accessed.
// you will get a warning in the console if you have a version that is in a different format than v(number)(blablabla)
// v1234, v1_0_2, and v1asdf, etc. don't give warnings, but things like vasdf, x1234, etc do.
module.exports.abnormal_version_function_example = () => "dasdjkldsadsa";

_privateFunction = (a, b) => a * b;
