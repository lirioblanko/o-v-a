import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import component from '../Menu.vue';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

describe('Menu Component', () => {
    const pinia = createPinia();

    const options = {
        global: {
            plugins: [
                pinia,
                ToastService,
            ],
            components: {
                Toast,
            }
        },
    };

    const buildWrapper = (char) => {
        const propsData = { char };

        return mount(component, {...options, propsData});
    }

    const wrapper = buildWrapper('test');

    it('mounts without errors', () => {
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('emits when link clicked', async () => {
        const link = wrapper.find('[data-test="menu-link-test"]');

        expect(link.exists()).toBeTruthy();
        await link.trigger('click');
        expect(wrapper.emitted().click).toHaveLength(1);
    })
});