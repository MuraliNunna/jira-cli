var jira = require('../jira')

module.exports = function (vorpal) {
  vorpal
    .command('describe project <project key>')
    .description('Describe a project by project key.')
    .action(function (args, callback) {
      var projectKey = args['project key']
      var jiraConnection = jira(vorpal)
      // var projectKey = vorpal.localStorage.getItem('projectKey')
      jiraConnection.getProject(projectKey, (err, response) => {
        if (err) {
          callback(err)
          return
        }
        this.log(response)
        callback()
      })
    })
}
