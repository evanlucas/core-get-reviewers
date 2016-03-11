#!/usr/bin/env node

'use strict'

const args = process.argv.splice(2)
    , GetReviewers = require('../')
    , fs = require('fs')
    , path = require('path')
    , home = process.env.HOME
    , usage = require('help')()
    , pkg = require('../package')
    , ghauth = require('ghauth')
    , authOptions = {
        configName: 'core-get-reviewers'
      , scopes: ['repo']
    }

if (!args.length) return usage(1)

if (args[0] === 'help' || args[0] === '-h' || args[0] === '--help') {
  return usage()
}

if (args[0] === 'version' || args[0] === 'v' || args[0] === '--version') {
  console.log('core-get-reviewers', `v${pkg.version}`)
  return
}

ghauth(authOptions, function (err, authData) {
  var cgr = GetReviewers({
    token: authData.token
  })

  cgr.fetchPR(args[0], function(err, out) {
    if (err) {
      console.error('ERR:', err)
      process.exit(1)
    }
    console.log(cgr.generate(args[0], out))
  })
})
