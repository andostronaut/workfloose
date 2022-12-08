const path = require('path')
const chalk = require('chalk')
const execa = require('execa')
const ora = require('ora')
const _ = require('lodash')

const constants = require('../constants')
const log = require('../utils/log')
const copy = require('../helpers/copy')

const spinner = ora({ text: '' })

module.exports = async ({ answers }) => {
  const { init, platform, environemt, override, extras, dependabot } = answers

  if (init) {
    spinner.start('Initialize git repository')

    execa('git', ['init']).then(() => {
      spinner.succeed('Git repository initialized')
    })
  }

  if (platform === constants.GITHUB_PLATFORM) {
    const src = path.join(
      __dirname,
      `${constants.TEMPLATE_PATH}/${platform}/ci/${environemt}-ci.yml`
    )
    const dest = path.join(process.cwd(), `.${platform}/workflows/ci.yml`)

    if (dest && !override) {
      return log(chalk.red('CI is already exist and cannot override it'), constants.LOG_TYPE_ERROR)
    }

    copy({
      src,
      dest,
      spinnerMsg: `Scaffold ${environemt} CI`,
      errorMsg: `An error occured while scaffolding ${environemt} CI.`,
      successMsg: `${_.capitalize(environemt)} CI scaffolded!`
    })

    if (Array.isArray(extras) && extras.length > 0) {
      if (extras.includes(constants.ASSIGN_WORKFLOW)) {
        const src = path.join(__dirname, `${constants.TEMPLATE_PATH}/${platform}/extras/assign.yml`)
        const dest = path.join(process.cwd(), `.${platform}/workflows/assign.yml`)

        if (dest && !override) {
          return log(
            chalk.red('Assign file is already exist and cannot override it'),
            constants.LOG_TYPE_ERROR
          )
        }

        copy({
          src,
          dest,
          spinnerMsg: 'Generate assign',
          errorMsg: 'An error occured while generating assign.',
          successMsg: 'Assign generated!'
        })
      }

      if (extras.includes(constants.LINTER_WORKFLOW)) {
        const src = path.join(__dirname, `${constants.TEMPLATE_PATH}/${platform}/extras/linter.yml`)
        const dest = path.join(process.cwd(), `.${platform}/workflows/linter.yml`)

        if (dest && !override) {
          return log(
            chalk.red('Linter file is already exist and cannot override it'),
            constants.LOG_TYPE_ERROR
          )
        }

        copy({
          src,
          dest,
          spinnerMsg: 'Generate linter',
          errorMsg: 'An error occured while generating linter.',
          successMsg: 'Linter generated!'
        })
      }

      if (extras.includes(constants.PR_WORKFLOW)) {
        const src = path.join(
          __dirname,
          `${constants.TEMPLATE_PATH}/${platform}/extras/pull-request.yml`
        )
        const dest = path.join(process.cwd(), `.${platform}/workflows/pull-request.yml`)

        if (dest && !override) {
          return log(
            chalk.red('Pull request file is already exist and cannot override it'),
            constants.LOG_TYPE_ERROR
          )
        }

        copy({
          src,
          dest,
          spinnerMsg: 'Generate pull request',
          errorMsg: 'An error occured while generating pull request.',
          successMsg: 'Pull request generated!'
        })
      }
    }

    if (dependabot) {
      const src = path.join(
        __dirname,
        `${constants.TEMPLATE_PATH}/${platform}/extras/dependabot.yml`
      )
      const dest = path.join(process.cwd(), `.${platform}/dependabot.yml`)

      if (dest && !override) {
        return log(
          chalk.red('Dependabot is already exist and cannot override it'),
          constants.LOG_TYPE_ERROR
        )
      }

      copy({
        src,
        dest,
        spinnerMsg: 'Generate dependabot',
        errorMsg: 'An error occured while generating dependabot.',
        successMsg: 'Dependabot generated!'
      })
    }
  }
}
