import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../../../src/components/BaseButton.vue'

describe('BaseButton', () => {
  it('renders slot content correctly', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('applies correct color classes', () => {
    const wrapper = mount(BaseButton, {
      props: {
        color: 'red'
      }
    })
    expect(wrapper.classes()).toContain('bg-red-600')
  })

  it('disables button when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('opacity-50')
  })
})