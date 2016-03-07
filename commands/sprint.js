var jira = require('../jira')
var columns = require('cli-columns')
var recentProjects = require('../state/projects')

module.exports = function (vorpal) {
  vorpal
    .command('sprint')
    .description('Get most recent sprint.')
    .action(function (args, callback) {
      // not working...
      var rapidViewId = vorpal.localStorage.getItem('rapidViewId')
      var jiraConnection = jira(vorpal)
      jiraConnection.getLastSprintForRapidView(parseInt(rapidViewId), (err, sprint) => {
        if (err) {
          callback(err)
          return
        }
        this.log(sprint)
        callback()
      })
    })

  vorpal.show()
}
