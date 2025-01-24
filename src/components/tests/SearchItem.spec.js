import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import component from '../SearchItem.vue';

vi.mock('primevue/inputicon', () => ({
    default: {
        name: 'InputIcon',
        template: '<div><slot /></div>',
    },
}));

vi.mock('primevue/iconfield', () => ({
    default: {
        name: 'IconField',
        template: '<div><slot /></div>',
    },
}));

vi.mock('primevue/inputtext', () => ({
    default: {
        name: 'InputText',
        props: ['modelValue'],
        template: '<input v-model="modelValue" @keyup.enter="$emit(\'keyup.enter\')" />',
    },
}));

describe('SearchItem Component', () => {
    const wrapper = mount(component);

    it('mounts without errors', () => {
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('emits search-products event with correct payload on Enter key press', async () => {
        const input = wrapper.find('input');

        await input.setValue('test');
        await input.trigger('keyup.enter');
        expect(wrapper.emitted()).toHaveProperty('search-products');
        expect(wrapper.emitted()['search-products']).toBeTruthy();
        expect(wrapper.emitted('search-products')[0][0]).toBe('test');
        // // Ждем обновления компонента перед проверкой значения
        // await wrapper.vm.$nextTick();
        expect(wrapper.vm.searchText).toBe('');
    });
});