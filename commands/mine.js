var table = require('table').default
var jira = require('../jira')
var recentIssues = require('../state/issues')
var getBorderCharacters = require('table').getBorderCharacters

module.exports = function (vorpal) {
  vorpal
    .command('mine')
    .description('List my issues.')
    .action(function (args, callback) {
      var username = vorpal.localStorage.getItem('username')
      var openOnly = false

      var jiraConnection = jira(vorpal)
      jiraConnection.getUsersIssues(username, openOnly, (err, response) => {
        if (err) {
          callback(err)
          return
        }
        // console.log(JSON.stringify(response.issues[0],null,2))
        response.issues.reverse()
        this.log(table(response.issues.map((issue)=> {
          // console.log(JSON.stringify(issue,null,2))
          var key = issue.key.blue
          if (issue.fields.status.description.includes('Task')) {
            key = `${key} (task)`
          }

          status = ''
          if (issue.fields.status.name === 'Open') {
            status = issue.fields.status.name.green
          } else if (issue.fields.status.name === 'In Progress') {
            status = issue.fields.status.name.yellow
          } else if (issue.fields.status.name === 'Closed') {
            status = issue.fields.status.name.grey
          } else {
            status = issue.fields.status.name
          }

          return [
            key,
            status,
            issue.fields.summary
          ]
        }), borderlessTableConfig))
        recentIssues.set(response.issues.map(function (issue) {
          return issue.key
        }))
        callback()
      })
    })

  vorpal.show()
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
