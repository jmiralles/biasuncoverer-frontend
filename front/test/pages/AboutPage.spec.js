import { mount } from '@vue/test-utils'
import AboutPage from '../../src/pages/AboutPage'

describe('AboutPage', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(AboutPage)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})