var jira = require('../jira')
var columns = require('cli-columns')

module.exports = function (vorpal) {
  vorpal
    .command('projects')
    .description('Projects')
    .action(function (args, callback) {
      var jiraConnection = jira(vorpal)
      jiraConnection.listProjects((err, projects) => {
        if (err) {
          callback(err)
          return
        }
        this.log(columns(projects.map((project)=> {
          return `${project.name} (${project.key.blue})`
        })))
        callback()
      })
    })

  vorpal.show()
}
