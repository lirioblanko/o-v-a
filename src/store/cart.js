import { ref } from "vue";
import { defineStore } from 'pinia'
import { apiService } from "../api/apiService.js";
import { useToastLogic } from "../scripts/hooks/useToast.js";
import { toISOString } from "../helpers.js";

export const useCartStore = defineStore('cart', () => {
    const count = ref(0);
    const cartProducts = ref([]);
    const { toastInfo } = useToastLogic();

    async function fetchOrder(order) {
        try {
            const response = await apiService.postAnything(order);
            console.log(`ответ: ${response.data}`)
            toastInfo(`Заказ успешно оформлен`, 'success' )
            clear();
        } catch (error) {
            toastInfo(`Ошибка при отправке: ${error}`, 'error' )
        }
    }

    function addOrder({ values }) {
        const { name, address, birthday, phone } = values
        const formatBirthday= toISOString(birthday)
        const order = {
            products: cartProducts.value,
            name,
            address,
            phone,
            birthday: formatBirthday,
        }
        fetchOrder(order)
    }

    function clear() {
        cartProducts.value = [];
        count.value = 0;
    }

    return { count, cartProducts, addOrder, clear }
})