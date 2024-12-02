import { createRouter, createWebHistory } from 'vue-router';
import Home from "../views/Home.vue";
import Cart  from "../views/Cart.vue";
import Auth from "../views/Auth.vue";
import New from "../views/New.vue";
import Product from "../views/Product.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/auth',
            name: 'auth',
            component: Auth
        },
        {
            path: '/new',
            name: 'new',
            component: New
        },
        {
            path: '/:productId',
            name: 'product',
            component: Product
        }
    ]
})

export default router