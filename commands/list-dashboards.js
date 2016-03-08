const jira = require('../jira')
var columns = require('cli-columns')
const get = require('../common/api-request').get

const API_URL = 'rest/api/2/dashboard?maxResults=1000'

module.exports = function (vorpal) {
  vorpal
    .command('list dashboards')
    .description('List dashboards.')
    .action(function (args, callback) {
      get(vorpal, API_URL).then((response) => {
        this.log(columns(response.data.dashboards.map((dashboard) => {
          return dashboard.name
        })))
        callback()
      }).catch(callback)
    })
}
