 mandrill-webhook-request-validator
=========

Node Module that validates that the request is a valid incoming Mandrill request. It does not authenticate the request.

## Installation
```bash
npm install mandrill-webhook-request-validator --save
```
## Usage

```javascript
var validator = require('mandrill-webhook-request-validator');

app.use(validator(options));
```

## Options

```javascript
var options = {
  url: 'url that the webhook is set to call',
};
```

* **url:** url that the webhook is set to call    

## Tests
```bash
npm test
```
## Links

[api documentation](./docs/api.md)

[jscs Report](./docs/jscs.md)

[jshint Report](./docs/jshint.md)

## Contributing

Use [Airbnb jscs style guide](https://github.com/airbnb/javascript).

Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

Not yet released.

## Legal Stuff

mandrill-webhook-request-validator is Copyright 2016 Aodhagán Collins. All Rights Reserved.

Distributed under [MIT License](https://tldrlegal.com/license/mit-license).
