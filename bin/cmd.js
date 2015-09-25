#!/usr/bin/env node

'use strict'

const args = process.argv.splice(2)
    , GetReviewers = require('../')
    , fs = require('fs')
    , path = require('path')
    , home = process.env.HOME
    , usage = require('help')()

if (!args.length) return usage(1)

if (args[0] === 'help' || args[0] === '-h' || args[0] === '--help') {
  return usage()
}

const token = readToken()

var cgr = GetReviewers({
  token: token
})

cgr.fetchPR(args[0], function(err, out) {
  if (err) {
    console.error('ERR:', err)
    process.exit(1)
  }
  console.log(cgr.generate(args[0], out))
})

function readToken() {
  try {
    return fs.readFileSync(path.join(home, '.github_token'), 'utf8').trim()
  }
  catch (err) {}
}
