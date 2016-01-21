(function() {
  'use strict';

  var METHOD = 'POST';
  var CONTENT_TYPE_HEADER = 'content-type';
  var CONTENT_TYPE = 'application/x-www-form-urlencoded';

  var RequestValidator = function(options) {

    if (!(this instanceof RequestValidator)) {
      return new RequestValidator(options);
    }

    options = options || {};

    if (!options.url) {
      throw new Error('Configuration is incomplete. Please see documentation.');
    }

    var validate = function(req, res, next) {
      var urlMatches = (req.url == options.url);
      var methodMatches = (req.method === METHOD);
      var contentTypeMatches = (req.headers[CONTENT_TYPE_HEADER] === CONTENT_TYPE);
      if (urlMatches && methodMatches && contentTypeMatches) {
        next();
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    };

    return validate;
  };

  module.exports = RequestValidator;
})();
