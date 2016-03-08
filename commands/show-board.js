const jira = require('../jira')
const columns = require('cli-columns')
const get = require('../common/api-request').get
var chalk = require('chalk')

module.exports = function (vorpal) {
  vorpal
    .command('show board')
    .description('Show board.')
    .action(function (args, callback) {
      const boardId = vorpal.localStorage.getItem('rapidViewId')
      if (!boardId) {
        this.log('No board chosen yet.')
        callback()
        return
      }
      // const API_URL = `rest/api/2/board/${boardId}/data`
      // const API_URL = `rest/greenhopper/1.0/xboard/config.json?returnDefaultBoard=false&rapidViewId=`
      const API_URL = `/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=${boardId}&selectedProjectKey=RD`
      get(vorpal, API_URL).then((response) => {
        const sprintName = response.data.sprintsData.sprints[0].name
        this.log(sprintName)
        response.data.columnsData.columns.forEach((column) => {
          const columnIssues = response.data.issuesData.issues.filter((issue) => {
            return column.statusIds.indexOf(issue.statusId) > -1
          })
          if (!columnIssues.length) {
            return
          }
          this.log(`  ${chalk.red(column.name)}`)

          columnIssues.forEach((issue) => {
            if (issue.parentKey && columnIssues.some((_issue) => {
              return _issue.key === issue.parentKey
            })) {
              return
            }
            // if (issue.typeName === 'Sub-task') {
            //   console.log(issue.parentKey)
            // }
            const assigneeSuffix = issue.assigneeName ? `(${issue.assigneeName})` : ''
            this.log(`    ${issue.key.blue} (${issue.typeName}) - ${issue.summary} ${assigneeSuffix}`)

            const subtasks = columnIssues.filter((_issue) => {
              return _issue.parentKey === issue.key
            })
            subtasks.forEach((issue) => {
              const assigneeSuffix = issue.assigneeName ? `(${issue.assigneeName})` : ''
              this.log(`      ${issue.key.blue} (${issue.typeName}) - ${issue.summary} ${assigneeSuffix}`)
            })
          })
        })
        callback()
      }).catch(callback)
    })
}
