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
  const { platform, environemt, version, customVersion, override } = answers

  const src = path.join(__dirname, `${constants.TEMPLATE_PATH}/${platform}/ci/${environemt}-ci.yml`)
  const dest = path.join(process.cwd(), '.gitlab-ci.yml')

  if (dest && !override) {
    return log(
      chalk.red('CI file is already exist and cannot override it'),
      constants.LOG_TYPE_ERROR
    )
  }

  spinner.start(`Scaffold ${environemt} CI`)

  fs.cp(src, dest, { recursive: true }, async (err) => {
    if (err) {
      return log(
        chalk.red(`An error occured while scaffolding ${environemt} CI.`, err),
        constants.LOG_TYPE_ERROR
      )
    }

    await read(dest)
      .then(() => {
        const yml = yaml.load(fs.readFileSync(dest, 'utf8'))

        if (version) {
          yml.image = `${environemt}:${customVersion}`
        }

        write(dest, { yml }).catch((err) => {
          log(chalk.red(err), constants.LOG_TYPE_ERROR)
        })
      })
      .catch((err) => {
        log(chalk.red(err), constants.LOG_TYPE_ERROR)
      })

    spinner.succeed(`${_.capitalize(environemt)} CI scaffolded!`)
  })
}

module.exports = { generate }
