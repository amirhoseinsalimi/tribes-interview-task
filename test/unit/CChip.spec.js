import { mount } from '@vue/test-utils'
import CChip from '~/components/CChip'

describe('CChip', () => {
  const id = 2
  const title = 'Chip Text'
  const type = 'secondary'

  test('should render `title` prop', () => {
    const wrapper = mount(CChip, {
      propsData: {
        id,
        title,
      },
    })

    expect(wrapper.html()).toContain(title)
  })

  test('should render `id` prop', () => {
    const wrapper = mount(CChip, {
      propsData: {
        id,
        title,
      },
    })

    expect(wrapper.html()).toContain(`${id}`)
  })

  test('should render secondary type', () => {
    const wrapper = mount(CChip, {
      propsData: {
        id,
        title,
        type,
      },
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining([`text-${type}`]))
  })
})
