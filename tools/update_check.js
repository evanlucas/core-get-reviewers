#!/usr/bin/env node

'use strict'

const GetReviewers = require('../')
const ghauth = require('ghauth')
const authOpts = {
  configName: 'core-get-reviewers'
, scopes: ['repo']
}

const users = GetReviewers.users

ghauth(authOpts, (err, authData) => {
  if (err) throw err
  const cgr = GetReviewers({
    token: authData.token
  })

  cgr.fetchCollabs((err, collabs) => {
    if (err) throw err

    for (let i = 0; i < collabs.length; i++) {
      const c = collabs[i]
      if (!users.hasOwnProperty(c)) {
        console.error('missing user', c)
      }
    }
  })
})
