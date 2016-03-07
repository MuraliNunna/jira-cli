var jira = require('../jira')
var table = require('table').default
var recentIssues = require('../state/issues')

module.exports = function (vorpal) {
  vorpal
    .command('comment <issue key> <comment>')
    .description('Comment on an issue.')
    .autocomplete({
      data: function () {
        return recentIssues.get()
      }
    })
    .action(function (args, callback) {
      var jiraConnection = jira(vorpal)
      jiraConnection.addComment(args['issue key'], args['comment'], (err, success) => {
        if (err) {
          callback(err)
          return
        }
        this.log('Comment posted.')
        callback()
      })
    })

  vorpal.show()
}

var tableConfig = {
  columns: {
    0: { width: 16, paddingLeft: 0 },
    1: { width: 100, wrapWord: true }
  }
}
