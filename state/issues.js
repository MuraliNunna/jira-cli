var recentIssues = []

exports.set = function (issues) {
  recentIssues = issues.concat(issues.map((issue) => {
    var parts = issue.split('-')
    return parts[parts.length - 1]
  }))
}

exports.get = function () {
  return recentIssues
}
