# core-get-reviewers


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
```

## Author

Evan Lucas

## License

MIT (See `LICENSE` for more info)
