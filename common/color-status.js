var chalk = require('chalk')

module.exports = function (name) {
  status = ''
  if (name === 'Open') {
    status = chalk.green(name)
  } else if (name === 'In Progress') {
    status = chalk.yellow(name)
  } else if (name === 'Closed') {
    status = chalk.dim(name)
  } else if (name === 'QA') {
    status = chalk.cyan(name)
  } else if (name === 'Feedback') {
    status = chalk.magenta(name)
  } else {
    status = name
  }
  return status
}
