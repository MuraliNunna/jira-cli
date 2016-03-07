var JiraApi = require('jira').JiraApi

module.exports = function(vorpal) {
  var protocol = vorpal.localStorage.getItem('protocol')
  var host = vorpal.localStorage.getItem('host')
  var port = vorpal.localStorage.getItem('port')
  var username = vorpal.localStorage.getItem('username')
  var password = vorpal.localStorage.getItem('password')

  var connection = new JiraApi(protocol, host, port, username, password, '2')
  return connection
}
