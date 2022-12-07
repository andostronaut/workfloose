const alert = require('cli-alerts')
const constants = require('../constants')

module.exports = (info, type = constants.LOG_TYPE_INFO) => {
  if (type === constants.LOG_TYPE_SUCCESS) {
    alert({
      type: 'success',
      name: 'SUCCESS',
      msg: info
    })
  } else if (type === constants.LOG_TYPE_WARNING) {
    alert({
      type: 'warning',
      name: 'WARNING',
      msg: info
    })
  } else if (type === constants.LOG_TYPE_ERROR) {
    alert({
      type: 'error',
      name: 'ERROR',
      msg: info
    })
  } else if (type === constants.LOG_TYPE_INFO) {
    alert({
      type: 'info',
      name: 'INFO',
      msg: info
    })
  }
}
