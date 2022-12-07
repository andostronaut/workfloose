const ora = require('ora')

const prompt = require('./helpers/prompt')
const scaffold = require('./helpers/scaffold')

const spinner = ora({ text: '' })

const generate = () => {
  prompt().then(async (answers) => {
    const { platform, environemt, workflow } = answers

    spinner.start('Scaffolding workflows...')

    await scaffold({ platform, environemt, workflow })

    spinner.succeed(`Workflows "${workflow}" ${environemt} scaffolded!`)
  })
}

module.exports = { generate }
