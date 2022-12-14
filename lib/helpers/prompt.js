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
      type: 'checkbox',
      name: 'workflows',
      message: 'What workflow(s) do you need?',
      choices: ['Continuous Integration', 'Continuous Deployment'],
      validate: (values) => {
        if (Array.isArray(values) && values.length > 0) {
          return true
        }

        return 'Please choose a workflow(s)'
      }
    },
    {
      type: 'list',
      name: 'environment',
      message: 'What environment do you use?',
      choices: ['Node', 'Php', 'Go', 'Ruby', 'Python'],
      filter: (val) => {
        return val.toLowerCase()
      }
    },
    {
      type: 'confirm',
      name: 'version',
      message: 'Would you like to use specific version?',
      default: true,
      when: (answers) => {
        return (
          !Array.isArray(answers.workflows) || answers.workflows.includes(constants.CI_WORKFLOW)
        )
      }
    },
    {
      type: 'input',
      name: 'customVersion',
      message: 'What version do you use?',
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
      type: 'list',
      name: 'provider',
      message: 'Deploy your app to which provider?',
      choices: ['Heroku', 'Netlify'],
      when: (answers) => {
        return Array.isArray(answers.workflows) && answers.workflows.includes(constants.CD_WORKFLOW)
      },
      filter: (val) => {
        return val.toLowerCase()
      }
    },
    {
      type: 'confirm',
      name: 'generateProcfile',
      message: 'Would you like to generate Heroku Procfile?',
      default: true,
      when: (answers) => {
        return answers.provider === constants.HEROKU_PROVIDER
      }
    },
    {
      type: 'confirm',
      name: 'generateToml',
      message: 'Would you like to generate Netlify Toml?',
      default: true,
      when: (answers) => {
        return answers.provider === constants.NETLIFY_PROVIDER
      }
    },
    {
      type: 'checkbox',
      name: 'extras',
      message: 'Would you like to add these workflows too?',
      choices: ['Super linter code base', 'Auto create pull request', 'Auto assign pull request'],
      when: (answers) => {
        return (
          answers.platform === constants.GITHUB_PLATFORM &&
          answers.workflows.includes(constants.CI_WORKFLOW)
        )
      }
    },
    {
      type: 'confirm',
      name: 'dependabot',
      message: 'Would you like to generate dependabot?',
      default: true,
      when: (answers) => {
        return (
          answers.platform === constants.GITHUB_PLATFORM &&
          answers.workflows.includes(constants.CI_WORKFLOW)
        )
      }
    },
    {
      type: 'list',
      name: 'dependabotPackageManager',
      message: 'What package manager do you use?',
      choices: ['Npm', 'Yarn', 'Pnpm'],
      when: (answers) => {
        return (
          answers.dependabot &&
          answers.environment === constants.NODE_ENVIRONMENT &&
          answers.workflows.includes(constants.CI_WORKFLOW)
        )
      },
      filter: (val) => {
        return val.toLowerCase()
      }
    },
    {
      type: 'list',
      name: 'dependabotPackageManager',
      message: 'What package manager do you use?',
      choices: ['Composer'],
      when: (answers) => {
        return (
          answers.dependabot &&
          answers.environment === constants.PHP_ENVIRONMENT &&
          answers.workflows.includes(constants.CI_WORKFLOW)
        )
      },
      filter: (val) => {
        return val.toLowerCase()
      }
    },
    {
      type: 'list',
      name: 'dependabotPackageManager',
      message: 'What package manager do you use?',
      choices: ['Gomod'],
      when: (answers) => {
        return (
          answers.dependabot &&
          answers.environment === constants.GO_ENVIRONMENT &&
          answers.workflows.includes(constants.CI_WORKFLOW)
        )
      },
      filter: (val) => {
        return val.toLowerCase()
      }
    },
    {
      type: 'list',
      name: 'dependabotPackageManager',
      message: 'What package manager do you use?',
      choices: ['Bundler'],
      when: (answers) => {
        return (
          answers.dependabot &&
          answers.environment === constants.RUBY_ENVIRONMENT &&
          answers.workflows.includes(constants.CI_WORKFLOW)
        )
      },
      filter: (val) => {
        return val.toLowerCase()
      }
    },
    {
      type: 'list',
      name: 'dependabotPackageManager',
      message: 'What package manager do you use?',
      choices: ['Pip'],
      when: (answers) => {
        return (
          answers.dependabot &&
          answers.environment === constants.PYTHON_ENVIRONMENT &&
          answers.workflows.includes(constants.CI_WORKFLOW)
        )
      },
      filter: (val) => {
        return val.toLowerCase()
      }
    }
  ]

  return inquirer.prompt(questions)
}
