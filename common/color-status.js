module.exports = function (name) {
  status = ''
  if (name === 'Open') {
    status = name.green
  } else if (name === 'In Progress') {
    status = name.yellow
  } else if (name === 'Closed') {
    status = name.dim
  } else if (name === 'QA') {
    status = name.cyan
  } else if (name === 'Feedback') {
    status = name.magenta
  } else {
    status = name
  }
  return status
}
