import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import component from '../ProductCard.vue';
import ToastService from 'primevue/toastservice';
import { createRouter, createWebHistory } from 'vue-router';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Image from 'primevue/image';

// Мок для компонента Rating
vi.mock('primevue/rating', () => ({
    default: {
        name: 'Rating',
        props: ['modelValue', 'readonly', 'justify', 'class'],
        template: '<div></div>',
    },
}));


describe('ProductCard Component', () => {
    const pinia = createPinia();

    const router = createRouter({
        history: createWebHistory(),
        routes: [],
    });

    const options = {
        global: {
            plugins: [
                pinia,
                ToastService,
                router
            ],
            components: {
                Toast,
                Button,
                Card,
                Image,
            }
        },
    };

    const buildWrapper = (product) => {
        const propsData = { product, addToCart: vi.fn(), goToProduct: vi.fn() };

        return mount(component, {...options, propsData});
    }

    const product = {
        id: 1,
        title: 'title',
        category: 'category',
        description: 'description',
        image: 'image.jpg',
        rating: {
            rate: 5,
        },
    };

    const wrapper = buildWrapper(product);

    it('mounts without errors', () => {
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('calls goToProduct when "Подробнее" button is clicked', async () => {
        const productButton = wrapper.find('[data-test="btn-product-1"]');
        const goToProduct = wrapper.props('goToProduct');

        expect(productButton.exists()).toBeTruthy();
        await productButton.trigger('click');
        expect(goToProduct).toHaveBeenCalledWith(product.id);
    });

    it('calls addToCart when "Купить" button is clicked', async () => {
        const buyButton = wrapper.find('[data-test="btn-buy-1"]');
        const addToCart = wrapper.props('addToCart');

        expect(buyButton.exists()).toBeTruthy();
        await buyButton.trigger('click');
        expect(addToCart).toHaveBeenCalledWith(product);
    });

});