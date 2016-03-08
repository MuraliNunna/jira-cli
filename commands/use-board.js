var jira = require('../jira')
var recentProjects = require('../state/projects')

module.exports = function (vorpal) {
  vorpal
    .command('use board <board name...>')
    .description('Use a board.')
    .autocomplete({
      data: function (input, callback) {
        try {
          const viewNames = JSON.parse(vorpal.localStorage.getItem('rapidViews') || '[]')
            .filter((view) => {
              return view.name.toLowerCase().indexOf(input.toLowerCase()) === 0
            })
            .map((view) => {
              return view.name
            })
          callback(viewNames)
        } catch (err) {
          callback([])
        }
      }
    })
    .action(function (args, callback) {
      const rapidViewName = args['board name'].join(' ')
      const views = JSON.parse(vorpal.localStorage.getItem('rapidViews')).filter((view) => {
        return view.name === rapidViewName
      })
      if (views.length) {
        this.log(`Using ${views[0].name}`.blue)
        vorpal.localStorage.setItem('rapidViewId', views[0].id)
      }
      callback()
    })
}
