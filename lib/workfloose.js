const prompt = require('./helpers/prompt')
const scaffold = require('./helpers/scaffold')

const generate = () => {
  prompt().then(async (answers) => {
    await scaffold({ answers })
  })
}

module.exports = { generate }
