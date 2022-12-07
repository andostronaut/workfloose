const prompt = require('./helpers/prompt')
const scaffold = require('./helpers/scaffold')

const generate = () => {
  prompt().then(async (answers) => {
    const { init, platform, environemt, workflow } = answers

    await scaffold({ init, platform, environemt, workflow })
  })
}

module.exports = { generate }
