import { ref } from "vue";
import { defineStore } from 'pinia'
import { apiService } from "../api/apiService.js";
import { useToastLogic } from "../scripts/hooks/useToast.js";
import { v4 as uuidv4 } from "uuid";

export const useCatalogStore = defineStore('catalog', () => {
    const isLoading = ref(true);
    const allProducts = ref([])
    const { toastInfo } = useToastLogic();

    async function fetchProducts() {
        try {
            const data = await apiService.getProducts();
            if (data) {
                allProducts.value = [...allProducts.value, ...data];
            }
        } catch (error) {
            toastInfo(`Ошибка при получении товаров: ${error}`, 'error' )
        }
        isLoading.value = false;
    }

    function addProduct({ values }) {
        const { title, image, category, description } = values

        allProducts.value.unshift(
            {
                id: uuidv4(),
                image,
                title,
                description,
                category: category.name,
                rating: {
                    rate: 0,
                    count: 0
                },
            })
        toastInfo(`Товар успешно добавлен`, 'success' )
    }

    return { isLoading, allProducts, fetchProducts, addProduct }
})