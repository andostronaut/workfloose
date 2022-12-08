const inquirer = require('inquirer')

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
      choices: ['Node', 'PHP', 'Go'],
      filter: (val) => {
        return val.toLowerCase()
      }
    },
    {
      type: 'checkbox',
      name: 'extras',
      message: 'Would you like to add these workflows too?',
      choices: ['Assign', 'Linter', 'Pull Request']
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
