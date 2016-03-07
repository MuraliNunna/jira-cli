var jira = require('../jira')
var table = require('table').default
var recentIssues = require('../state/issues')

module.exports = function (vorpal) {
  vorpal
    .command('show <issue key>')
    .description('Show an issue.')
    .autocomplete({
      data: function () {
        return recentIssues.get()
      }
    })
    .action(function (args, callback) {
      var jiraConnection = jira(vorpal)
      var issueKey = String(args['issue key'])
      if (issueKey.indexOf('-') === -1) {
        issueKey = `${vorpal.localStorage.getItem('projectKey')}-${issueKey}`
      }
      jiraConnection.findIssue(issueKey, (err, issue) => {
        if (err) {
          callback(err)
          return
        }
        // console.log(JSON.stringify(issue,null,2))

        var _table = []

        // _table.push(['Project', issue.fields.project.name])
        if (issue.fields.parent) {
          _table.push(['Parent', `${issue.fields.parent.key} - ${issue.fields.parent.fields.summary}`])
        }
        _table.push(['Summary', issue.fields.summary])
        if (issue.fields.description) {
          _table.push(['Description', issue.fields.description.replace(/[\n\r\t]/g,' ')])
        }
        _table.push(['Status', issue.fields.status.name])
        _table.push(['Creator', issue.fields.creator.displayName])
        _table.push(['Assignee', issue.fields.assignee.displayName])
        if (issue.fields.subtasks && issue.fields.subtasks.length) {
          // _table.push(['Subtasks', issue.fields.subtasks])
        }
        _table.push(['Type', issue.fields.issuetype.name])

        this.log(table(
          _table,
          tableConfig
        ))
        callback()
      })
    })
}

var tableConfig = {
  columns: {
    0: { width: 16, paddingLeft: 0 },
    1: { width: 100, wrapWord: true }
  }
}
