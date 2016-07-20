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
, 'addaleax': 'Anna Henningsen <anna@addaleax.net>'
, 'andrasq': 'Andras <andras@kinvey.com>'
, 'bengl': 'Bryan English <bryan@bryanenglish.com>'
, 'bmeck': 'Bradley Farias <bradley.meck@gmail.com>'
, 'AndreasMadsen': 'Andreas Madsen <amwebdk@gmail.com>'
, 'benjamingr': 'Benjamin Gruenbaum <benjamingr@gmail.com>'
, 'brendanashworth': 'Brendan Ashworth <brendan.ashworth@me.com>'
, 'bzoz': 'Bartosz Sosnowski <bartosz@janeasystems.com>'
, 'calvinmetcalf': 'Calvin Metcalf <calvin.metcalf@gmail.com>'
, 'ChALkeR': 'Сковорода Никита Андреевич <chalkerx@gmail.com>'
, 'claudiorodriguez': 'Claudio Rodriguez <cjrodr@yahoo.com>'
, 'domenic': 'Domenic Denicola <d@domenic.me>'
, 'eljefedelrodeodeljefe': 'Robert Lindstaedt <robert.lindstaedt@gmail.com>'
, 'estliberitas': 'Alexander Makarenko <estliberitas@gmail.com>'
, 'evanlucas': 'Evan Lucas <evanlucas@me.com>'
, 'firedfox': 'Daniel Wang <wangyang0123@gmail.com>'
, 'geek': 'Wyatt Preul <wpreul@gmail.com>'
, 'iarna': 'Rebecca Turner <me@re-becca.org>'
, 'isaacs': 'Isaac Z. Schlueter <i@izs.me>'
, 'iWuzHere': 'Imran Iqbal <imran@imraniqbal.org>'
, 'JacksonTian': 'Jackson Tian <shvyo1987@gmail.com>'
, 'jbergstroem': 'Johan Bergström <bugs@bergstroem.nu>'
, 'jhamhader': 'Yuval Brik <yuval@brik.org.il>'
, 'joaocgreis': 'João Reis <reis@janeasystems.com>'
, 'julianduque': 'Julian Duque <julianduquej@gmail.com>'
, 'JungMinu': 'Minwoo Jung <jmwsoft@gmail.com>'
, 'lance': 'Lance Ball <lball@redhat.com>'
, 'lxe': 'Aleksey Smolenchuk <lxe@lxe.co>'
, 'matthewloring': 'Matthew Loring <mattloring@google.com>'
, 'mcollina': 'Matteo Collina <matteo.collina@gmail.com>'
, 'mhdawson': 'Michael Dawson <michael_dawson@ca.ibm.com>'
, 'micnic': 'Nicu Micleușanu <micnic90@gmail.com>'
, 'mikeal': 'Mikeal Rogers <mikeal.rogers@gmail.com>'
, 'monsanto': 'Christopher Monsanto <chris@monsan.to>'
, 'ofrobots': 'Ali Ijaz Sheikh <ofrobots@google.com>'
, 'Olegas': 'Oleg Elifantiev <oleg@elifantiev.ru>'
, 'othiym23': 'Forrest L Norvell <ogd@aoaioxxysz.net>'
, 'petkaantonov': 'Petka Antonov <petka_antonov@hotmail.com>'
, 'phillipj': 'Phillip Johnsen <johphi@gmail.com>'
, 'pmq20': 'Minqi Pan <pmq2001@gmail.com>'
, 'Qard': 'Stephen Belanger <admin@stephenbelanger.com>'
, 'rlidwka': 'Alex Kocharin <alex@kocharin.ru>'
, 'rmg': 'Ryan Graham <r.m.graham@gmail.com>'
, 'robertkowalski': 'Robert Kowalski <rok@kowalski.gd>'
, 'romankl': 'Roman Klauke <romaaan.git@gmail.com>'
, 'ronkorving': 'Ron Korving <ron@ronkorving.nl>'
, 'RReverser': 'Ingvar Stepanyan <me@rreverser.com>'
, 'saghul': 'Saúl Ibarra Corretgé <saghul@gmail.com>'
, 'sam-github': 'Sam Roberts <vieuxtech@gmail.com>'
, 'santigimeno': 'Santiago Gimeno <santiago.gimeno@gmail.com>'
, 'seishun': 'Nikolai Vavilov <vvnicholas@gmail.com>'
, 'silverwind': 'Roman Reiss <me@silverwind.io>'
, 'srl295': 'Steven R Loomis <srloomis@us.ibm.com>'
, 'stefanmb': 'Stefan Budeanu <stefan@budeanu.com>'
, 'targos': 'Michaël Zasso <mic.besace@gmail.com>'
, 'tellnes': 'Christian Tellnes <christian@tellnes.no>'
, 'TheAlphaNerd': 'Myles Borins <myles.borins@gmail.com>'
, 'thefourtheye': 'Sakthipriyan Vairamani <thechargingvolcano@gmail.com>'
, 'thekemkid': 'Glen Keane <glenkeane.94@gmail.com>'
, 'thlorenz': 'Thorsten Lorenz <thlorenz@gmx.de>'
, 'Trott': 'Rich Trott <rtrott@gmail.com>'
, 'tunniclm': 'Mike Tunnicliffe <m.j.tunnicliffe@gmail.com>'
, 'vkurchatkin': 'Vladimir Kurchatkin <vladimir.kurchatkin@gmail.com>'
, 'whitlockjc': 'Jeremy Whitlock <jwhitlock@apache.org>'
, 'yorkie': 'Yorkie Liu <yorkiefixer@gmail.com>'
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

GetReviewers.users = users

// the Collaborators team is id 1202829
GetReviewers.prototype.fetchCollabs = function fetchCollabs(cb) {
  this.fetchTeams((err, team) => {
    if (err) return cb(err)
    const id = team.id
    this.github.orgs.getTeamMembers({
      id: team.id
    , page: 0
    , per_page: 100
    }, (err, members) => {
      if (err) return cb(err)
      const out = members.map((item) => {
        return item.login
      })
      cb(null, out)
    })
  })
}

GetReviewers.prototype.fetchTeams = function fetchTeams(cb) {
  this.github.orgs.getTeams({
    org: 'nodejs'
  , page: 0
  , per_page: 50
  }, (err, teams) => {
    if (err) return cb(err)
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i]
      if (team.name === 'Collaborators') {
        return cb(null, team)
      }
    }
    cb(new Error('Unable to find collaborators team'))
  })
}

GetReviewers.prototype.getReviewer = function getReviewer(username) {
  return users[username]
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
  , repo: this.opts.nodePrivate ? 'node-private' : 'node'
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
  var str = `\nPR-URL: https://github.com/nodejs/${this.opts.nodePrivate ? 'node-private' : 'node'}/pull/${pr}`
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
