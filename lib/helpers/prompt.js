const inquirer = require('inquirer')

module.exports = () => {
  const questions = [
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
      type: 'list',
      name: 'environemt',
      message: 'What environemt do you use?',
      choices: ['Node'],
      filter: (val) => {
        return val.toLowerCase()
      }
    },
    {
      type: 'list',
      name: 'workflow',
      message: 'Which workflow do you need?',
      choices: ['basic', 'with-dependabot'],
      filter: (val) => {
        return val.toLowerCase()
      }
    }
  ]

  return inquirer.prompt(questions)
}
