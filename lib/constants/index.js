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
  TEMPLATE_PATH,
  ASSIGN_WORKFLOW,
  LINTER_WORKFLOW,
  PR_WORKFLOW,
  VERSION_REGEX,
  EXTRAS_KEY
}
