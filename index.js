require('colors')
const vorpal = require('vorpal')()
  .delimiter('jira$')
  .history('jira')
  .localStorage('jira')

require('./commands/configure')(vorpal)
require('./commands/projects')(vorpal)

if (!vorpal.localStorage.getItem('username') || !vorpal.localStorage.getItem('password')) {
  vorpal.exec('configure')
}
