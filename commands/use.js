var jira = require('../jira')
var table = require('table').default
var getBorderCharacters = require('table').getBorderCharacters

module.exports = function (vorpal) {
  vorpal
    .command('use <projectKey>')
    .description('Use a project')
    .action(function (args, callback) {
      console.log(`Using ${args.projectKey}`.blue)
      vorpal.localStorage.setItem('projectKey', args.projectKey)
      callback()
    })

  vorpal.show()
}

var borderlessTableConfig = {
  border: getBorderCharacters('void'),
  drawHorizontalLine: function () {
    return false
  }
}
