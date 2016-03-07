require('colors')
var getRandomProductivityQuote = require('./state/productivity-quotes')

const vorpal = require('vorpal')()
  .delimiter('jira$')
  .history('jira')
  .localStorage('jira')

require('./commands/comment')(vorpal)
require('./commands/configure')(vorpal)
require('./commands/get-project')(vorpal)
require('./commands/find-rapid-view')(vorpal)
require('./commands/list-projects')(vorpal)
require('./commands/mine')(vorpal)
require('./commands/show')(vorpal)
require('./commands/sprint')(vorpal)
require('./commands/use')(vorpal)

if (vorpal.localStorage.getItem('showProductivityQuote')) {
  vorpal.log(getRandomProductivityQuote().yellow)
}

if (!vorpal.localStorage.getItem('username') || !vorpal.localStorage.getItem('password')) {
  vorpal.exec('configure')
}
