import { inject } from "vue";

export const useOrderLogic = (isVisibleModal) => {
    const count = inject('count');
    const cartProducts = inject('cartProducts');

    function toggleModal(value) {
        isVisibleModal.value = value;
    }

    function addToCart(product) {
        const existingProduct = cartProducts.value.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.count++;
        } else {
            cartProducts.value.push({
                id: product.id,
                image: product.image,
                title: product.title,
                count: 1,
            });
        }
        toggleModal(true)
        count.value++;
    }

    return { addToCart, toggleModal }
}