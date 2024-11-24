const API_URL = 'http://fakestoreapi.com';
const EHO_SERVER='https://httpbin.org/';

export const apiService = {
    async getProducts() {
        const response = await fetch(`${API_URL}/products`);

        return await response.json();
    },

    async getProductById(id) {
        const response = await fetch(`${API_URL}/products/${id}`);

        return await response.json();
    },

    async postAnything(anything) {
        const response = await fetch(`${EHO_SERVER}/anything`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(anything)
        });

        return await response.json();
    }
};