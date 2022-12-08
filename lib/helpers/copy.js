const fs = require('fs')
const chalk = require('chalk')
const ora = require('ora')

const constants = require('../constants')
const log = require('../utils/log')

const spinner = ora({ text: '' })

module.exports = ({ src, dest, recursive = true, errorMsg, successMsg, spinnerMsg }) => {
  spinner.start(spinnerMsg)

  fs.cp(src, dest, { recursive }, (err) => {
    if (err) {
      log(chalk.red(errorMsg), constants.LOG_TYPE_ERROR)

      return log(chalk.red(err), constants.LOG_TYPE_ERROR)
    }

    spinner.succeed(successMsg)
  })
}
