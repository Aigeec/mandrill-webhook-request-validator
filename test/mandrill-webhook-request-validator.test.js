(function() {
  'use strict';
  /*jshint expr: true*/

  var chai = require('chai');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');
  var expect = chai.expect;
  chai.use(sinonChai);

  var requestValidator = require('../src/mandrill-webhook-request-validator');

  var config = { url: 'http://example.com' };

  var getMockedResult = function(res) {
    res = res || {};
    res.writeHead = sinon.spy();
    res.end = sinon.spy();
    return res;
  };

  var notFoundTest = function(id, req, res) {
    requestValidator(config)(req, res, function() {});

    expect(res.writeHead.getCall(id).args[0]).to.equal(404);
    expect(res.end.getCall(id).args[0]).to.equal('Not Found');
  };

  describe('#mandrill-webhook-request-validator', function() {

    it('should return a function that accepts three parameters', function() {
      expect(requestValidator(config).length).to.equal(3);
    });

    describe('should validate its options', function() {

      it('should check for a url parameter', function() {
        var testFunction = function() { requestValidator();};

        expect(testFunction).to.throw(Error);
      });

    });

    describe('it should only call next for POST requests', function() {

      var res = getMockedResult();

      var methods = ['GET', 'PUT', 'DELETE'];

      var test = function(idx, methods) {
        it(methods[idx] + ': Not Found', function() { notFoundTest(idx, { method: methods[idx], headers: {} }, res); });
      };

      var idx;
      for (idx in methods) {
        test(idx, methods);
      }

      it('POST: continue', function() {
        var nextSpy = sinon.spy();
        var headers = {};
        headers['content-type'] = 'application/x-www-form-urlencoded';
        requestValidator(config)({ method: 'POST', url: 'http://example.com', headers: headers }, {}, nextSpy);
        expect(nextSpy.calledOnce).to.be.true;
      });

    });

    it('it should return 200 for HEAD requests', function() {
      var res = getMockedResult();
      var nextSpy = sinon.spy();
      var headers = {};
      requestValidator(config)({ method: 'HEAD', url: 'http://example.com', headers: headers }, res, nextSpy);
      expect(res.writeHead.getCall(0).args[0]).to.equal(200);
      expect(res.end.getCall(0).args[0]).to.equal('Ok');
    });

    describe('it only accepts request for the correct content-type', function() {

      it('application/x-www-form-urlencoded: continue', function() {
        var nextSpy = sinon.spy();
        var headers = {};
        headers['content-type'] = 'application/x-www-form-urlencoded';
        requestValidator(config)({ method: 'POST', url: 'http://example.com', headers: headers }, {}, nextSpy);
        expect(nextSpy.calledOnce).to.be.true;
      });

      it('application/json: Not Found', function() {
        var headers = {};
        headers['content-type'] = 'application/json';
        notFoundTest(0, { method: 'POST', url: 'http://example.com', headers: headers }, getMockedResult());
      });

    });

    describe('it only accepts requests for the specified url', function() {
      it('same url: continue', function() {
        var nextSpy = sinon.spy();
        var headers = {};
        headers['content-type'] = 'application/x-www-form-urlencoded';
        requestValidator(config)({ method: 'POST', url: 'http://example.com', headers: headers }, {}, nextSpy);
        expect(nextSpy.calledOnce).to.be.true;
      });

      it('different: Not Found', function() {
        var headers = {};
        headers['content-type'] = 'application/x-www-form-urlencoded';
        notFoundTest(0, { method: 'POST', url: 'http://different.com', headers: headers }, getMockedResult());
      });
    });

  });

})();
