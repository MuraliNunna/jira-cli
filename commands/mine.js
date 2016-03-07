var jira = require('../jira')
var table = require('table').default
var getBorderCharacters = require('table').getBorderCharacters

module.exports = function (vorpal) {
  vorpal
    .command('mine')
    .description('Show my issues')
    .action(function (args, callback) {
      var username = vorpal.localStorage.getItem('username')
      var openOnly = true

      var jiraConnection = jira(vorpal)
      jiraConnection.getUsersIssues(username, openOnly, (err, response) => {
        if (err) {
          callback(err)
          return
        }
        // console.log(JSON.stringify(response.issues[0],null,2))
        this.log(table(response.issues.map((issue)=> {
          // console.log(JSON.stringify(issue,null,2))
          var key = issue.key
          if (issue.fields.status.description.includes('Task')) {
            key = `${key} (task)`
          }
          return [
            key,
            issue.fields.status.name,
            issue.fields.summary
          ]
        }), borderlessTableConfig))
        callback()
      })
    })

  vorpal.show()
}

var borderlessTableConfig = {
  border: getBorderCharacters('void'),
  columns: {
    0: { width: 16, paddingLeft: 2 },
    1: { width: 16, paddingLeft: 2 },
    2: { width: 100, wrapWord: true }
  },
  drawHorizontalLine: function () {
    return false
  }
}
