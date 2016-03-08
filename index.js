#! /usr/bin/env node

require('colors')

const vorpal = require('vorpal')()
  .localStorage('jira')
  .delimiter(`${'jira'.blue}$`)
  .history('jira')

const runSingleCommand = process.argv.length > 2
const credentialsSet = vorpal.localStorage.getItem('username') && vorpal.localStorage.getItem('password')

require('./commands/comment')(vorpal)
require('./commands/configure')(vorpal)
require('./commands/describe-project')(vorpal)
// require('./commands/find-rapid-view')(vorpal)
require('./commands/list-boards')(vorpal)
require('./commands/list-dashboards')(vorpal)
require('./commands/list-projects')(vorpal)
require('./commands/mine')(vorpal)
require('./commands/search')(vorpal)
require('./commands/show-board')(vorpal)
require('./commands/show-issue')(vorpal)
// require('./commands/sprint')(vorpal)
require('./commands/use-project')(vorpal)
require('./commands/use-board')(vorpal)

vorpal.show()

if (!credentialsSet) {
  vorpal.execSync('configure')
}

if (runSingleCommand) {
  vorpal.parse(process.argv)
}
