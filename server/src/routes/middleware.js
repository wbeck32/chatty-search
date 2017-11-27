module.exports = {
  asyncIt(fn) {
    return function(req, res, next) {
      fn(req)
        .then(returnedVal => {
          res.send(returnedVal);
        })
        .catch(next);
    };
  }
}