const path = require('path')
const chalk = require('chalk')
const execa = require('execa')
const ora = require('ora')

const constants = require('../constants')
const log = require('../utils/log')
const copy = require('../helpers/copy')

const spinner = ora({ text: '' })

module.exports = async ({ answers }) => {
  const { init, platform, environemt, override, dependabot } = answers

  if (init) {
    spinner.start('Initialize git repository')

    execa('git', ['init']).then(() => {
      spinner.succeed('Git repository initialized')
    })
  }

  if (platform === constants.GITHUB_PLATFORM) {
    const base = path.join(
      __dirname,
      `${constants.TEMPLATE_PATH}/${platform}/ci/${environemt}-ci.yml`
    )
    const output = path.join(process.cwd(), `.${platform}/workflows/ci.yml`)

    if (output && !override) {
      return log(chalk.red('CI file detected and cannot override it'), constants.LOG_TYPE_ERROR)
    }

    copy({
      base,
      output,
      spinnerMsg: `Scaffold ${environemt} CI`,
      errorMsg: `An error occured while scaffolding ${environemt} CI.`,
      successMsg: `${environemt} CI scaffolded!`
    })

    if (dependabot) {
      const base = path.join(
        __dirname,
        `${constants.TEMPLATE_PATH}/${platform}/extras/dependabot.yml`
      )
      const output = path.join(process.cwd(), `.${platform}/dependabot.yml`)

      copy({
        base,
        output,
        spinnerMsg: 'Generate dependabot',
        errorMsg: 'An error occured while generating dependabot.',
        successMsg: 'Dependabot generated!'
      })
    }
  }
}
