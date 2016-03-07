var recentIssues = []

exports.replace = function (issues) {
  recentIssues = issues
}

exports.get = function () {
  return recentIssues
}
