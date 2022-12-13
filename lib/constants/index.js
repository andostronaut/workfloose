const GITHUB_PLATFORM = 'github'
const GITLAB_PLATFORM = 'gitlab'

const LOG_TYPE_SUCCESS = 'success'
const LOG_TYPE_ERROR = 'error'
const LOG_TYPE_WARNING = 'warning'
const LOG_TYPE_INFO = 'info'

const NODE_ENVIRONMENT = 'node'
const PHP_ENVIRONMENT = 'php'
const GO_ENVIRONMENT = 'go'
const RUBY_ENVIRONMENT = 'ruby'
const PYTHON_ENVIRONMENT = 'python'

const TEMPLATE_PATH = '../../templates'

const ASSIGN_WORKFLOW = 'Assign'
const LINTER_WORKFLOW = 'Linter'
const PR_WORKFLOW = 'Pull Request'

const VERSION_REGEX = /^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/

const EXTRAS_KEY = Object.freeze({
  'Super linter code base': 'super-linter',
  'Auto create pull request': 'create-pr',
  'Auto assign pull request': 'assign-pr'
})

const CI_WORKFLOW = 'Continuous Integration'
const CD_WORKFLOW = 'Continuous Deployment'

const WORKFLOW_KEY = Object.freeze({
  'Continuous Integration': 'ci',
  'Continuous Deployment': 'cd'
})

const HEROKU_DEPLOYER = 'heroku'

const PROCFILE_CONFIG = {
  node: 'web: bin/web npm start',
  go: 'web: bin/your-go-app',
  php: 'web: vendor/bin/heroku-php-apache2',
  python: 'web: python app.py',
  ruby: 'web: bundle exec rails server -p $PORT'
}

module.exports = {
  GITHUB_PLATFORM,
  GITLAB_PLATFORM,
  LOG_TYPE_SUCCESS,
  LOG_TYPE_ERROR,
  LOG_TYPE_WARNING,
  LOG_TYPE_INFO,
  NODE_ENVIRONMENT,
  PHP_ENVIRONMENT,
  GO_ENVIRONMENT,
  RUBY_ENVIRONMENT,
  PYTHON_ENVIRONMENT,
  TEMPLATE_PATH,
  ASSIGN_WORKFLOW,
  LINTER_WORKFLOW,
  PR_WORKFLOW,
  VERSION_REGEX,
  EXTRAS_KEY,
  CI_WORKFLOW,
  CD_WORKFLOW,
  WORKFLOW_KEY,
  HEROKU_DEPLOYER,
  PROCFILE_CONFIG
}
