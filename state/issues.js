var recentIssues = []

exports.set = function (issues) {
  recentIssues = issues
}

exports.get = function () {
  return recentIssues
}
