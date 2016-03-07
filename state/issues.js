exports.set = function (vorpal, issues) {
  recentIssues = issues.concat(issues.map((issue) => {
    var parts = issue.split('-')
    return parts[parts.length - 1]
  }))
  vorpal.localStorage.setItem('recentIssues', recentIssues)
}
