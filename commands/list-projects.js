var jira = require('../jira')
var columns = require('cli-columns')
var recentProjects = require('../state/projects')

module.exports = function (vorpal) {
  vorpal
    .command('list projects')
    .description('List projects.')
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
        recentProjects.set(projects.map((project) => {
          return project.key
        }))
        callback()
      })
    })
}
