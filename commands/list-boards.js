const jira = require('../jira')
var columns = require('cli-columns')
const get = require('../common/api-request').get

const API_URL = 'rest/greenhopper/latest/rapidviews/list'

module.exports = function (vorpal) {
  vorpal
    .command('list boards')
    .description('List boards.')
    .action(function (args, callback) {
      get(vorpal, API_URL).then((response) => {
        this.log(columns(response.data.views.map((view) => {
          return `${view.name} (${view.id})`
        })))
        vorpal.localStorage.setItem('rapidViews', JSON.stringify(response.data.views))
        callback()
      }).catch(callback)
    })
}
