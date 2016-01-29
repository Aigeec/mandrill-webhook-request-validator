(function() {
  'use strict';

  var TEST_METHOD = 'HEAD';

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

    var respondWith = function(res, statusCode, message) {
      res.writeHead(statusCode);
      res.end(message);
    };

    var validate = function(req, res, next) {
      var urlMatches = (req.url == options.url);
      var methodMatches = (req.method === METHOD);
      var contentTypeMatches = (req.headers[CONTENT_TYPE_HEADER] === CONTENT_TYPE);
      var isTest = (req.method === TEST_METHOD);
      if (urlMatches && methodMatches && contentTypeMatches) {
        next();
      } else if (urlMatches && isTest) {
        respondWith(res, 200, 'Ok');
      } else {
        respondWith(res, 404, 'Not Found');
      }
    };

    return validate;
  };

  module.exports = RequestValidator;
})();
