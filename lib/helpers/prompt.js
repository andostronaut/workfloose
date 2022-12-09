const inquirer = require('inquirer')
const constants = require('../constants')

module.exports = () => {
  const questions = [
    {
      type: 'confirm',
      name: 'init',
      message: 'Initialize git in directory?',
      default: false
    },
    {
      type: 'list',
      name: 'platform',
      message: 'What platform do you use?',
      choices: ['Github', 'Gitlab'],
      filter: (val) => {
        return val.toLowerCase()
      }
    },
    {
      type: 'confirm',
      name: 'override',
      message: 'Override if file exist?',
      default: true
    },
    {
      type: 'list',
      name: 'environemt',
      message: 'What environemt do you use for CI?',
      choices: ['Node', 'Php', 'Go'],
      filter: (val) => {
        return val.toLowerCase()
      }
    },
    {
      type: 'confirm',
      name: 'version',
      message: 'Would you like to use specific version?',
      default: true
    },
    {
      type: 'input',
      name: 'customVersion',
      message: 'Which version you need?',
      when: (answers) => {
        return answers.version
      },
      validate: (val) => {
        const pass = val.match(constants.VERSION_REGEX)
        if (pass) {
          return true
        }

        return 'Please enter a valid version'
      }
    },
    {
      type: 'checkbox',
      name: 'extras',
      message: 'Would you like to add these workflows too?',
      choices: ['Super linter code base', 'Auto create pull request', 'Auto assign pull request']
    },
    {
      type: 'confirm',
      name: 'dependabot',
      message: 'Would you like to generate dependabot?',
      default: false
    }
  ]

  return inquirer.prompt(questions)
}
