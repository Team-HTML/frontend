import Q from 'q';

export const promisify = (request) => {
  var deferred = Q.defer();
  request.end((err, res) => {
    if (err || res.body.errorMessage) {
      if (res.body) {
        return deferred.reject(new Error(res.body.errorMessage));
      }
      return deferred.reject(err);
    }
    deferred.resolve(res.body);
  });
  return deferred.promise;
};