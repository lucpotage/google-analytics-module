const { setup, loadConfig, get } = require('@nuxtjs/module-test-utils')

describe('disabled sendHitTask', () => {
  let nuxt, addTemplate

  beforeAll(async () => {
    const beforeNuxtReady = (nuxt) => {
      addTemplate = nuxt.moduleContainer.addTemplate = jest.fn(
        nuxt.moduleContainer.addTemplate
      )
    }
    ({ nuxt } = (await setup(loadConfig(__dirname, 'disabled-send-hit-task'), { beforeNuxtReady })))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const html = await get('/')
    expect(html).toContain('Works!')
  })

  test('sendHitTask should be false', () => {
    expect(addTemplate).toBeDefined()
    const call = addTemplate.mock.calls.find(args => args[0].src.includes('plugin.js'))
    expect(call).toBeDefined()
    const options = call[0].options
    expect(options.debug.sendHitTask).toBe(false)
  })
})
