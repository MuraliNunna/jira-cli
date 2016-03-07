var jira = require('../jira')
var table = require('table').default
var yaml = require('js-yaml')
var transform = require('lodash/transform')

module.exports = function (vorpal) {
  vorpal
    .command('show <issue key>')
    .description('Show an issue.')
    .autocomplete({
      data: function () {
        return vorpal.localStorage.getItem('recentIssues').split(',') || []
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
        var subtasks = transform(issue.fields.subtasks || [], function (result, subtask) {
          result[`${subtask.key} (${subtask.fields.status.name})`] = subtask.fields.summary
        }, {})

        var output = {
          Parent: issue.fields.parent && `${issue.fields.parent.key} - ${issue.fields.parent.fields.summary}`,
          Summary: issue.fields.summary,
          Type: issue.fields.issuetype.name,
          Description: issue.fields.description.replace(/[\n\r\t]/g,' '),
          Summary: issue.fields.summary,
          Status: issue.fields.status.name,
          Creator: issue.fields.creator.displayName,
          Assignee: issue.fields.assignee.displayName,
          Subtasks: issue.fields.subtasks && subtasks
        }

        this.log(yaml.dump(pruneEmptyValues(output)))

        // _table.push(['Project', issue.fields.project.name])
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

function pruneEmptyValues (object) {
  return transform(object, function(result, value, key) {
    if (value) {
      result[key] = value
    }
  }, {})
}
