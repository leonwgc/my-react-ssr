const request = require('request');

module.exports = (page, pkg, env, req, res, next) => {
  request(
    { url: `https://static.domain.com/${env}/mkt/${pkg}/${page}?${Math.random()}` },
    function (error, response, body) {
      if (error) {
        next();
      }
      if (
        !error &&
        ((response.statusCode >= 200 && response.statusCode < 300) || response.statusCode == 304)
      ) {
        res.send(body);
      } else {
        next();
      }
    }
  );
};
