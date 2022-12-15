const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const { read } = require('node-yaml')
const yaml = require('js-yaml')
const write = require('write-yaml-file')
const execa = require('execa')

const _ = require('lodash')

const constants = require('../../constants')
const log = require('../../utils/log')

const copy = require('../copy')

const spinner = ora({ text: '' })

const generate = ({ answers }) => {
  const {
    platform,
    workflows,
    environment,
    publish,
    dockerfile,
    dockerignore,
    version,
    provider,
    customVersion,
    override,
    generateProcfile,
    generateToml
  } = answers

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
        let dpl = {}
        let pbl = {}

        if (constants.hasCD(workflows)) {
          const src = path.join(
            __dirname,
            `${constants.TEMPLATE_PATH}/${platform}/providers/${provider}.yml`
          )

          dpl = yaml.load(fs.readFileSync(src, 'utf8'))
        }

        const yml = yaml.load(fs.readFileSync(dest, 'utf8'))

        if (version) {
          yml.image = `${environment}${
            environment === constants.GO_ENVIRONMENT ? 'lang' : ''
          }:${customVersion}`
        }

        if (generateProcfile) {
          spinner.start('Generate Heroku Procfile')

          execa('touch', ['Procfile']).then(() => {
            const dest = path.join(process.cwd(), 'Procfile')
            const content = constants.PROCFILE_CONFIG[environment]

            if (dest && !override) {
              return log(
                chalk.red('Procfile file is already exist and cannot override it'),
                constants.LOG_TYPE_ERROR
              )
            }

            fs.writeFile(dest, content, (err) => {
              if (err) {
                return log(
                  chalk.red('An error occured while generating Heroku Procfile', err),
                  constants.LOG_TYPE_ERROR
                )
              }

              spinner.succeed('Heroku Procfile generated')
            })
          })
        }

        if (generateToml) {
          execa('touch', ['netlify.toml']).then(() => {
            const src = path.join(__dirname, `${constants.TEMPLATE_PATH}/config/${provider}.toml`)
            const dest = path.join(process.cwd(), 'netlify.toml')

            if (dest && !override) {
              return log(
                chalk.red('Netlify toml file is already exist and cannot override it'),
                constants.LOG_TYPE_ERROR
              )
            }

            copy({
              src,
              dest,
              spinnerMsg: 'Generate Netlify Toml',
              errorMsg: 'An error occured while generating Netlify Toml',
              successMsg: 'Netlify Toml generated'
            })
          })
        }

        if (publish) {
          const src = path.join(
            __dirname,
            `${constants.TEMPLATE_PATH}/${platform}/extras/publish.yml`
          )

          pbl = yaml.load(fs.readFileSync(src, 'utf8'))
        }
        if (dockerfile) {
          const src = path.join(
            __dirname,
            `${constants.TEMPLATE_PATH}/config/docker/dockerfiles/${environment}.Dockerfile`
          )
          const dest = path.join(process.cwd(), 'Dockerfile')

          if (dest && !override) {
            return log(
              chalk.red('Dockerfile file is already exist and cannot override it'),
              constants.LOG_TYPE_ERROR
            )
          }

          copy({
            src,
            dest,
            spinnerMsg: 'Generate Dockerfile',
            errorMsg: 'An error occured while generating Dockerfile',
            successMsg: 'Dockerfile generated'
          })

          if (dockerignore) {
            const src = path.join(
              __dirname,
              `${constants.TEMPLATE_PATH}/config/docker/.dockerignore`
            )
            const dest = path.join(process.cwd(), '.dockerignore')

            if (dest && !override) {
              return log(
                chalk.red('.dockerignore file is already exist and cannot override it'),
                constants.LOG_TYPE_ERROR
              )
            }

            copy({
              src,
              dest,
              spinnerMsg: 'Generate .dockerignore',
              errorMsg: 'An error occured while generating .dockerignore',
              successMsg: '.dockerignore generated'
            })
          }
        }

        const content = {
          ...(constants.hasCI(workflows) && yml),
          ...(constants.hasCD(workflows) && pbl),
          ...(constants.hasCD(workflows) && dpl)
        }

        write(dest, content).catch((err) => {
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
