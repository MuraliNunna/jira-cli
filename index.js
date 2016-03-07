require('colors')
const vorpal = require('vorpal')()
  .delimiter('jira$')
  .history('jira')
  .localStorage('jira')

require('./commands/configure')(vorpal)
require('./commands/projects')(vorpal)
require('./commands/use')(vorpal)
require('./commands/mine')(vorpal)

if (!vorpal.localStorage.getItem('username') || !vorpal.localStorage.getItem('password')) {
  vorpal.exec('configure')
}
