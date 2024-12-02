import { useRouter } from 'vue-router';

export const useRouterLogic = () => {
    const router = useRouter();

    function goToHome() {
        router.push(`/`)
    }

    function goToProduct (id) {
        router.push(`/${id}`);
    }

    function goToNewProduct() {
        router.push('/new');
    }

    function goToCart() {
        router.push(`/cart`)
    }

    function goToAuth() {
        router.push(`/auth`)
    }

    return {
        goToHome,
        goToProduct,
        goToNewProduct,
        goToCart,
        goToAuth
    }
}