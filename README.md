# core-get-reviewers

[![Build Status](https://travis-ci.org/evanlucas/core-get-reviewers.svg)](https://travis-ci.org/evanlucas/core-get-reviewers)
[![Coverage Status](https://coveralls.io/repos/evanlucas/core-get-reviewers/badge.svg?branch=master&service=github)](https://coveralls.io/github/evanlucas/core-get-reviewers?branch=master)

Get reviewers that have signed off on node core PR

## Install

```bash
$ npm install [-g] core-get-reviewers
```

## Usage

```js
const GetReviewers = require('core-get-reviewers')
const cgr = new GetReviewers({
  token: '<github token>'
})

cgr.fetchPR(3102, function(err, obj) {
  if (err) throw err
  console.log(cgr.generate(3102, obj))
  // =>
  // => PR-URL: https://github.com/nodejs/node/pull/3102
  // => Reviewed-By: XXX
  // => Reviewed-By: XXX
  // => Reviewed-By: XXX
})

// or to just get a reviewer from a username
// note: case is sensitive here
cgr.getReviewer('evanlucas')
// => 'Evan Lucas <evanlucas@me.com>'
```

## Author

Evan Lucas

## License

MIT (See `LICENSE` for more info)
