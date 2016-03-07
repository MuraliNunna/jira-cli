var table = require('table').default
var jira = require('../jira')
var recentIssues = require('../state/issues')
var colorStatus = require('../common/color-status')
var getBorderCharacters = require('table').getBorderCharacters

module.exports = function (vorpal) {
  vorpal
    .command('search <query...>')
    .description('Search with query string (jql).')
    .action(function (args, callback) {
      const searchString = args['query'].join(' ')
      var jiraConnection = jira(vorpal)
      jiraConnection.searchJira(searchString, {}, (err, response) => {
        if (err) {
          callback('err',   err)
          return
        }

        response.issues.reverse()

        this.log(table(response.issues.map((issue) => {
          var key = issue.key.blue
          status = colorStatus(issue.fields.status.name)
          return [
            key,
            issue.fields.assignee ? issue.fields.assignee.displayName : '',
            status,
            issue.fields.summary
          ]
        }), borderlessTableConfig))
        callback()
      })
    })
}

var borderlessTableConfig = {
  border: getBorderCharacters('void'),
  columns: {
    0: { width: 10, paddingLeft: 0 },
    1: { width: 20, paddingLeft: 2 },
    2: { width: 12, paddingLeft: 2 },
    3: { width: 100, wrapWord: true }
  },
  drawHorizontalLine: function () {
    return false
  }
}
