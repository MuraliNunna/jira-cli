var jira = require('../jira')
var table = require('table').default
var getBorderCharacters = require('table').getBorderCharacters

module.exports = function (vorpal) {
  vorpal
    .command('use <project key>')
    .description('Use a project')
    .action(function (args, callback) {
      console.log(`Using ${args['project key']}`.blue)
      vorpal.localStorage.setItem('projectKey', args['project key'])
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
