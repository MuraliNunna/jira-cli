var recentProjects = []

exports.set = function (projects) {
  recentProjects = projects
}

exports.get = function () {
  return recentProjects
}
