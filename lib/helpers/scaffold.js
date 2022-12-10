const execa = require('execa')
const ora = require('ora')

const constants = require('../constants')

const github = require('./platforms/github')
const gitlab = require('./platforms/gitlab')

const spinner = ora({ text: '' })

module.exports = async ({ answers }) => {
  const { init, platform } = answers

  if (init) {
    spinner.start('Initialize git repository')

    execa('git', ['init']).then(() => {
      spinner.succeed('Git repository initialized')
    })
  }

  if (platform === constants.GITHUB_PLATFORM) {
    github.generate({ answers })
  }

  if (platform === constants.GITLAB_PLATFORM) {
    gitlab.generate({ answers })
  }
}
