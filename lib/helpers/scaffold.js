const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const execa = require('execa')
const ora = require('ora')
const { read } = require('node-yaml')
const yaml = require('js-yaml')
const write = require('write-yaml-file')

const _ = require('lodash')

const constants = require('../constants')
const log = require('../utils/log')
const copy = require('../helpers/copy')

const spinner = ora({ text: '' })

module.exports = async ({ answers }) => {
  const {
    init,
    platform,
    environemt,
    version,
    customVersion,
    distribution,
    customDistribution,
    override,
    extras,
    dependabot,
    dependabotPackageManager
  } = answers

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
            yml.jobs.build.strategy.matrix[`${environemt}-version`] = customVersion
          }

          if (distribution) {
            yml.jobs.build.strategy.matrix[`${environemt}-distribution`] = customDistribution
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

    if (Array.isArray(extras) && extras.length > 0) {
      extras.forEach((e) => {
        const key = constants.EXTRAS_KEY

        const src = path.join(
          __dirname,
          `${constants.TEMPLATE_PATH}/${platform}/extras/${key[e]}.yml`
        )
        const dest = path.join(process.cwd(), `.${platform}/workflows/${key[e]}.yml`)

        if (dest && !override) {
          return log(
            chalk.red(`${e} file is already exist and cannot override it`),
            constants.LOG_TYPE_ERROR
          )
        }

        copy({
          src,
          dest,
          spinnerMsg: `Generate ${key[e]}`,
          errorMsg: `An error occured while generating ${key[e]}.`,
          successMsg: `${e} file generated!`
        })
      })
    }

    if (dependabot) {
      const src = path.join(
        __dirname,
        `${constants.TEMPLATE_PATH}/${platform}/dpbot/${dependabotPackageManager}-dependabot.yml`
      )
      const dest = path.join(process.cwd(), `.${platform}/dependabot.yml`)

      if (dest && !override) {
        return log(
          chalk.red('Dependabot file is already exist and cannot override it'),
          constants.LOG_TYPE_ERROR
        )
      }

      copy({
        src,
        dest,
        spinnerMsg: 'Generate dependabot',
        errorMsg: 'An error occured while generating dependabot.',
        successMsg: 'Dependabot file generated!'
      })
    }
  }

  if (platform === constants.GITLAB_PLATFORM) {
    const src = path.join(
      __dirname,
      `${constants.TEMPLATE_PATH}/${platform}/ci/${environemt}-ci.yml`
    )
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
}
