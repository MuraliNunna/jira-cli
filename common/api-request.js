var request = require('axios')

exports.get = function (vorpal, path) {
  const protocol = vorpal.localStorage.getItem('protocol')
  const host = vorpal.localStorage.getItem('host')
  const port = vorpal.localStorage.getItem('port')
  const username = vorpal.localStorage.getItem('username')
  const password = vorpal.localStorage.getItem('password')
  const url = `${protocol}://${host}:${port}/${path}`

  return request.get(url, {
    auth: {
      username,
      password
    },
    responseType: 'json'
  })
}
