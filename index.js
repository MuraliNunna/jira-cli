#! /usr/bin/env node

require('colors')
var getRandomProductivityQuote = require('./state/productivity-quotes')

const vorpal = require('vorpal')()
  .localStorage('jira')

const runSingleCommand = process.argv.length > 2

require('./commands/comment')(vorpal)
require('./commands/configure')(vorpal)
require('./commands/get-project')(vorpal)
require('./commands/find-rapid-view')(vorpal)
require('./commands/list-projects')(vorpal)
require('./commands/mine')(vorpal)
require('./commands/search')(vorpal)
require('./commands/show')(vorpal)
require('./commands/sprint')(vorpal)
require('./commands/use')(vorpal)

if (!vorpal.localStorage.getItem('username') || !vorpal.localStorage.getItem('password')) {
  vorpal.exec('configure')
}

if (runSingleCommand) {
  vorpal.parse(process.argv)
} else {
  vorpal
    .delimiter(`${'jira'.blue}$`)
    .history('jira')
  if (vorpal.localStorage.getItem('showProductivityQuote')) {
    vorpal.log(getRandomProductivityQuote().yellow)
  }
  vorpal.show()
}
