'use strict'

const test = require('tap').test
const CGR = require('../')
const fixture = require('./fixtures/fixture')
const results = require('./fixtures/results')

test('fetchPR without number', function(t) {
  t.plan(2)
  var cgr = new CGR({
    token: '1234'
  })

  cgr.fetchPR(null, function(err) {
    t.type(err, Error)
    t.equal(err.message, 'PR number is required')
  })
})

test('fetchPR error', function(t) {
  t.plan(2)
  var cgr = new CGR({
    token: '1234'
  })

  var orig = cgr.github.issues.getComments
  cgr.github.issues.getComments = function(opts, cb) {
    process.nextTick(function() {
      cb(new Error('Error'))
    })
  }

  cgr.fetchPR(123, function(err) {
    cgr.github.issues.getComments = orig
    t.type(err, Error)
    t.equal(err.message, 'Error')
  })
})

test('fetchPR success', function(t) {
  t.plan(2)
  var cgr = new CGR({
    token: '1234'
  })

  var orig = cgr.github.issues.getComments
  cgr.github.issues.getComments = function(opts, cb) {
    process.nextTick(function() {
      cb(null, fixture)
    })
  }

  cgr.fetchPR(123, function(err, out) {
    cgr.github.issues.getComments = orig
    t.ifError(err, 'err should not exist')
    t.deepEqual(out, results)
  })
})

test('generate', function(t) {
  t.plan(1)
  var cgr = CGR({
    token: '1234'
  })
  var out = cgr.generate(123, results)
  t.deepEqual(out, `
PR-URL: https://github.com/nodejs/node/pull/123
Reviewed-By: Steven R Loomis <srloomis@us.ibm.com>
Reviewed-By: Roman Reiss <me@silverwind.io>
Reviewed-By: Rod Vagg <rod@vagg.org>`)
})

test('generate with invalid username', function(t) {
  t.plan(1)
  var cgr = CGR({
    token: '1234'
  })
  t.throws(function() {
    cgr.generate(123, [
      {
        username: 'evan'
      }
    ])
  }, /Cannot find email for reviewer evan/)
})

test('getReviewer', function(t) {
  t.plan(2)
  var cgr = CGR({
    token: '1234'
  })

  t.notOk(cgr.getReviewer('biscuits'))
  t.equal(cgr.getReviewer('evanlucas'), 'Evan Lucas <evanlucas@me.com>')
})
