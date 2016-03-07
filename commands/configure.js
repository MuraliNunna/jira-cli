module.exports = function (vorpal) {
  vorpal
    .command('configure')
    .description('Set username, password, host, etc.')
    .action(function (args, callback) {
      this.prompt([
        {
          type: 'input',
          name: 'protocol',
          message: 'Protocol? (default: https) ',
          default: 'https'
        },
        {
          type: 'input',
          name: 'host',
          message: 'Host? (default: instructure.atlassian.net) ',
          default: 'instructure.atlassian.net'
        },
        {
          type: 'input',
          name: 'port',
          message: 'Port? (default: 443) ',
          default: '443'
        },
        {
          type: 'input',
          name: 'project',
          message: 'Project? (default: CNVS) ',
          default: 'CNVS'
        },
        {
          type: 'input',
          name: 'rapidViewId',
          message: 'Rapid view id? (see /secure/RapidBoard.jspa?rapidView=[id]) '
        },
        {
          type: 'input',
          name: 'issueType',
          message: 'Issue type? (default: New Feature) ',
          default: 'New Feature'
        },
        {
          type: 'input',
          name: 'username',
          message: 'Username? '
        },
        {
          type: 'password',
          name: 'password',
          message: 'Password? '
        }
      ], function (input) {
        vorpal.localStorage.setItem('protocol', input.protocol)
        vorpal.localStorage.setItem('host', input.host)
        vorpal.localStorage.setItem('port', input.port)
        vorpal.localStorage.setItem('projectKey', input.project)
        vorpal.localStorage.setItem('rapidViewId', input.rapidViewId)
        vorpal.localStorage.setItem('issueType', input.issueType)
        vorpal.localStorage.setItem('username', input.username)
        vorpal.localStorage.setItem('password', input.password)
        callback()
      })
    })
}
