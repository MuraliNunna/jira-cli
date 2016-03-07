var table = require('table').default
var jira = require('../jira')
var recentIssues = require('../state/issues')
var colorStatus = require('../common/color-status')
var getBorderCharacters = require('table').getBorderCharacters

module.exports = function (vorpal) {
  vorpal
    .command('mine')
    .description('List my issues.')
    .action(function (args, callback) {
      var username = vorpal.localStorage.getItem('username')
      var openOnly = true

      var jiraConnection = jira(vorpal)
      jiraConnection.getUsersIssues(username, openOnly, (err, response) => {
        if (err) {
          callback(err)
          return
        }
        response.issues.reverse()
        this.log(table(response.issues.map((issue)=> {
          var key = issue.key.blue
          if (issue.fields.status.description.includes('Task')) {
            key = `${key} (task)`
          }

          status = colorStatus(issue.fields.status.name)

          return [
            key,
            status,
            issue.fields.summary
          ]
        }), borderlessTableConfig))
        recentIssues.set(vorpal, response.issues.map(function (issue) {
          return issue.key
        }))
        callback()
      })
    })
}

var borderlessTableConfig = {
  border: getBorderCharacters('void'),
  columns: {
    0: { width: 16, paddingLeft: 0 },
    1: { width: 16, paddingLeft: 2 },
    2: { width: 100, wrapWord: true }
  },
  drawHorizontalLine: function () {
    return false
  }
}
