import Q from 'q';

export const promisify = (request) => {
  var deferred = Q.defer();
  request.end((err, res) => {
    console.log(res);
    if (err || res.body.error) {
      if (res.body) {
        return deferred.reject(new Error(res.body.error));
      }
      return deferred.reject(err);
    }
    deferred.resolve(res.body);
  });
  return deferred.promise;
};