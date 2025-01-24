import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import component from '../Modal.vue';

describe('Modal Component', () => {
    it('mounts without errors', () => {
        const wrapper =  mount(component);

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot()
    })
});