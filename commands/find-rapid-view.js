var jira = require('../jira')

module.exports = function (vorpal) {
  vorpal
    .command('find rapid view for <project name>')
    .description('Get a rapid view by project name.')
    .action(function (args, callback) {
      var projectName = args['project name']
      var jiraConnection = jira(vorpal)
      // var projectKey = vorpal.localStorage.getItem('projectKey')
      console.log({projectName})
      jiraConnection.findRapidView(projectName, (err, response) => {
        if (err) {
          callback(err)
          return
        }
        this.log(response)
        callback()
      })
    })

  vorpal.show()
}
