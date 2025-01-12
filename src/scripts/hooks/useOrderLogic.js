import { storeToRefs } from "pinia";
import { useCartStore } from "../../store/cart.js";

export const useOrderLogic = (isVisibleModal) => {
    let cartStore = useCartStore();
    const { count, cartProducts } = storeToRefs(cartStore)

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