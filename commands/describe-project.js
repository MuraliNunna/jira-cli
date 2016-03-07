var jira = require('../jira')
var yaml = require('js-yaml')

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
        var output = {
          name: response.name
        }
        if (response.description) {
          output.description = response.description
        }
        if (response.key) {
          output.key = response.key
        }
        if (response.lead.displayName) {
          output.lead = response.lead.displayName
        }
        if (response.components && response.components.length) {
          output.components = response.components.map((component) => component.name)
        }

        this.log(yaml.dump(output))
        callback()
      })
    })
}
