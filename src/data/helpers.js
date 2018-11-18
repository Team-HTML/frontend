import Q from 'q';

export const promisify = (request) => {
  var deferred = Q.defer();
  request.end((err, res) => {
    if (err || res.body.errorMessage || res.body.message) {

      if (!res) {
        return deferred.reject(new Error("Internal Server Error"))
      }

      if (res.body) {
        return deferred.reject(new Error(res.body.errorMessage));
      }
      return deferred.reject(err);
    }
    deferred.resolve(res.body);
  });
  return deferred.promise;
};