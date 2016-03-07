var jira = require('../jira')
var table = require('table').default
var getBorderCharacters = require('table').getBorderCharacters

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
        this.log(table(projects.map((project)=> {
          return [
            project.key,
            project.name
          ]
        }), borderlessTableConfig))
        callback()
      })
    })

  vorpal.show()
}

var borderlessTableConfig = {
  border: getBorderCharacters('void'),
  drawHorizontalLine: function () {
    return false
  }
}
