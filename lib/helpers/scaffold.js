const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const constants = require('../constants')
const log = require('../utils/log')

module.exports = async ({ platform, environemt, workflow }) => {
  const inDirPath = path.join(__dirname, `${constants.TEMPLATE_PATH}/${environemt}/${workflow}`)
  const outDirPath = path.join(process.cwd(), `.${platform}`)

  fs.cp(inDirPath, outDirPath, { recursive: true }, (err) => {
    if (err) {
      log(chalk.red('An error occured while copying the folder.'), constants.LOG_TYPE_ERROR)

      return log(chalk.red(err), constants.LOG_TYPE_ERROR)
    }
  })
}
