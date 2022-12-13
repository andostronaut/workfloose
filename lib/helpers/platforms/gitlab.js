const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const { read } = require('node-yaml')
const yaml = require('js-yaml')
const write = require('write-yaml-file')

const _ = require('lodash')

const constants = require('../../constants')
const log = require('../../utils/log')

const spinner = ora({ text: '' })

const generate = ({ answers }) => {
  const { platform, environment, version, customVersion, override } = answers

  const src = path.join(
    __dirname,
    `${constants.TEMPLATE_PATH}/${platform}/ci/${environment}-ci.yml`
  )
  const dest = path.join(process.cwd(), '.gitlab-ci.yml')

  if (dest && !override) {
    return log(
      chalk.red('CI file is already exist and cannot override it'),
      constants.LOG_TYPE_ERROR
    )
  }

  spinner.start(`Scaffold ${environment} CI/CD`)

  fs.cp(src, dest, { recursive: true }, async (err) => {
    if (err) {
      return log(
        chalk.red(`An error occured while scaffolding ${environment} CI/CD.`, err),
        constants.LOG_TYPE_ERROR
      )
    }

    await read(dest)
      .then(() => {
        const yml = yaml.load(fs.readFileSync(dest, 'utf8'))

        if (version) {
          yml.image = `${environment}${
            environment === constants.GO_ENVIRONMENT ? 'lang' : ''
          }:${customVersion}`
        }

        write(dest, yml).catch((err) => {
          log(chalk.red(err), constants.LOG_TYPE_ERROR)
        })
      })
      .catch((err) => {
        log(chalk.red(err), constants.LOG_TYPE_ERROR)
      })

    spinner.succeed(`${_.capitalize(environment)} CI/CD scaffolded!`)
  })
}

module.exports = { generate }
