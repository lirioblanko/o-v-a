import { describe, it, expect, vi } from 'vitest';import { ref } from 'vue';
import { setActivePinia, createPinia } from 'pinia';

import { useCartStore } from '../../../store/cart.js';
import { useOrderLogic } from '../useOrderLogic.js';
import { useToast } from 'primevue/usetoast'; // Импортируйте useToast

vi.mock('primevue/usetoast', () => ({
    useToast: vi.fn(),
}));

describe('useOrderLogic', () => {
    let isVisibleModal;
    let cartStore;
    let toast;

    beforeEach(() => {
        setActivePinia(createPinia());
        cartStore = useCartStore();
        isVisibleModal = ref(false);
        toast = {
            add: vi.fn(),
        };

        useToast.mockReturnValue(toast);
    });

    it('should add a new product to the cart', () => {
        const { addToCart } = useOrderLogic(isVisibleModal);
        const product = { id: 1, image: 'image-url', title: 'Product 1' };

        addToCart(product);

        expect(cartStore.cartProducts).toHaveLength(1);
        expect(cartStore.cartProducts[0]).toEqual({
            id: 1,
            image: 'image-url',
            title: 'Product 1',
            count: 1,
        });
        expect(cartStore.count).toBe(1);
    });

    it('should increment the count of an existing product in the cart', () => {
        const existingProduct = { id: 1, image: 'image-url', title: 'Product 1', count: 1 };
        cartStore.cartProducts.push(existingProduct);
        cartStore.count = 0;

        const { addToCart } = useOrderLogic(isVisibleModal);
        const product = { id: 1, image: 'image-url', title: 'Product 1' };

        addToCart(product);

        expect(cartStore.cartProducts).toHaveLength(1);
        expect(cartStore.cartProducts[0]).toEqual({
            id: 1,
            image: 'image-url',
            title: 'Product 1',
            count: 2,
        });
        expect(cartStore.count).toBe(1);
        addToCart(product);
        expect(cartStore.count).toBe(2);
        addToCart(product);
        expect(cartStore.count).toBe(3);
        expect(cartStore.count).toBe(3);
    });
});