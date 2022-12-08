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
      choices: ['Github'],
      filter: (val) => {
        return val.toLowerCase()
      }
    },
    {
      type: 'confirm',
      name: 'override',
      message: 'If ci file detected override it?',
      default: true
    },
    {
      type: 'list',
      name: 'environemt',
      message: 'What environemt do you use?',
      choices: ['Node', 'PHP', 'Go'],
      filter: (val) => {
        return val.toLowerCase()
      }
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
