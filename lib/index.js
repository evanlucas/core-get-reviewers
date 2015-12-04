'use strict'

const Github = require('github')
    , pkg = require('../package')

module.exports = GetReviewers

const users = {
  // TSC
  'bnoordhuis': 'Ben Noordhuis <info@bnoordhuis.nl>'
, 'chrisdickinson': 'Chris Dickinson <christopher.s.dickinson@gmail.com>'
, 'cjihrig': 'Colin Ihrig <cjihrig@gmail.com>'
, 'Fishrock123': 'Jeremiah Senkpiel <fishrock123@rocketmail.com>'
, 'indutny': 'Fedor Indutny <fedor.indutny@gmail.com>'
, 'jasnell': 'James M Snell <jasnell@gmail.com>'
, 'misterdjules': 'Julien Gilli <jgilli@nodejs.org>'
, 'mscdex': 'Brian White <mscdex@mscdex.net>'
, 'orangemocha': 'Alexis Campailla <orangemocha@nodejs.org>'
, 'piscisaureus': 'Bert Belder <bertbelder@gmail.com>'
, 'rvagg': 'Rod Vagg <rod@vagg.org>'
, 'shigeki': 'Shigeki Ohtsu <ohtsu@iij.ad.jp>'
, 'trevnorris': 'Trevor Norris <trev.norris@gmail.com>'
  // Collaborators
, 'brendanashworth': 'Brendan Ashworth <brendan.ashworth@me.com>'
, 'ChALkeR': 'Сковорода Никита Андреевич <chalkerx@gmail.com>'
, 'domenic': 'Domenic Denicola <d@domenic.me>'
, 'evanlucas': 'Evan Lucas <evanlucas@me.com>'
, 'geek': 'Wyatt Preul <wpreul@gmail.com>'
, 'iarna': 'Rebecca Turner <me@re-becca.org>'
, 'isaacs': 'Isaac Z. Schlueter <i@izs.me>'
, 'jbergstroem': 'Johan Bergström <bugs@bergstroem.nu>'
, 'joaocgreis': 'João Reis <reis@janeasystems.com>'
, 'julianduque': 'Julian Duque <julianduquej@gmail.com>'
, 'JungMinu': 'Minwoo Jung <jmwsoft@gmail.com>'
, 'lxe': 'Aleksey Smolenchuk <lxe@lxe.co>'
, 'mhdawson': 'Michael Dawson <michael_dawson@ca.ibm.com>'
, 'micnic': 'Nicu Micleușanu <micnic90@gmail.com>'
, 'mikeal': 'Mikeal Rogers <mikeal.rogers@gmail.com>'
, 'monsanto': 'Christopher Monsanto <chris@monsan.to>'
, 'ofrobots': 'Ali Ijaz Sheikh <ofrobots@google.com>'
, 'Olegas': 'Oleg Elifantiev <oleg@elifantiev.ru>'
, 'petkaantonov': 'Petka Antonov <petka_antonov@hotmail.com>'
, 'Qard': 'Stephen Belanger <admin@stephenbelanger.com>'
, 'rlidwka': 'Alex Kocharin <alex@kocharin.ru>'
, 'robertkowalski': 'Robert Kowalski <rok@kowalski.gd>'
, 'romankl': 'Roman Klauke <romaaan.git@gmail.com>'
, 'saghul': 'Saúl Ibarra Corretgé <saghul@gmail.com>'
, 'sam-github': 'Sam Roberts <vieuxtech@gmail.com>'
, 'seishun': 'Nikolai Vavilov <vvnicholas@gmail.com>'
, 'silverwind': 'Roman Reiss <me@silverwind.io>'
, 'srl295': 'Steven R Loomis <srloomis@us.ibm.com>'
, 'targos': 'Michaël Zasso <mic.besace@gmail.com>'
, 'tellnes': 'Christian Tellnes <christian@tellnes.no>'
, 'TheAlphaNerd': 'Myles Borins <myles.borins@gmail.com>'
, 'thefourtheye': 'Sakthipriyan Vairamani <thechargingvolcano@gmail.com>'
, 'thlorenz': 'Thorsten Lorenz <thlorenz@gmx.de>'
, 'Trott': 'Rich Trott <rtrott@gmail.com>'
, 'tunniclm': 'Mike Tunnicliffe <m.j.tunnicliffe@gmail.com>'
, 'vkurchatkin': 'Vladimir Kurchatkin <vladimir.kurchatkin@gmail.com>'
, 'yosuke-furukawa': 'Yosuke Furukawa <yosuke.furukawa@gmail.com>'
, 'zkat': 'Kat Marchán <kzm@sykosomatic.org>'
}

function GetReviewers(opts) {
  if (!(this instanceof GetReviewers))
    return new GetReviewers(opts)

  this.version = pkg.version
  this.opts = opts
  this.github = new Github({
    version: '3.0.0'
  , headers: {
      'User-Agent': `core-get-reviewers v${pkg.version}`
    }
  })

  this.github.authenticate({
    type: 'oauth'
  , token: opts.token
  })
}

GetReviewers.prototype.fetchPR = function fetchPR(number, cb) {
  var self = this
  if (!number) {
    setImmediate(function() {
      cb(new Error('PR number is required'))
    })
    return
  }
  // TODO(evanlucas) handle situations where there are > 100 comments
  self.github.issues.getComments({
    user: 'nodejs'
  , repo: 'node'
  , number: number
  , page: 0
  , per_page: 100
  }, function(err, comments) {
    if (err) return cb(err)
    comments = comments.filter(function(comment) {
      return /LGTM/i.test(comment.body)
        && users.hasOwnProperty(comment.user.login)
    }).reduce(function(set, comment) {
      if (!set.hasOwnProperty(comment.user.login)) {
        set[comment.user.login] = {
          username: comment.user.login
        , userId: comment.user.id
        , body: comment.body
        }
      }

      return set
    }, {})

    const keys = Object.keys(comments)
        , len = keys.length
        , out = new Array(len)

    for (var i = 0; i < len; i++) {
      out[i] = comments[keys[i]]
    }
    cb(null, out)
  })
}

GetReviewers.prototype.generate = function generate(pr, reviewers) {
  var str = `\nPR-URL: https://github.com/nodejs/node/pull/${pr}`
  var len = reviewers.length
  for (var i = 0; i < len; i++) {
    var reviewer = reviewers[i].username
    var email = users[reviewer]
    if (!email) {
      throw new Error(`Cannot find email for reviewer ${reviewer}`)
    }
    str += `\nReviewed-By: ${email}`
  }

  return str
}
