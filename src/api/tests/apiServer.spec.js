import {describe, it, expect, vi} from 'vitest';
import { apiService, API_URL } from '../apiService.js';


describe('API service', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('imports without error', () => {
        expect(apiService).toBeDefined();
        expect(apiService).toHaveProperty('getProducts');
        expect(apiService).toHaveProperty('getProductById');
        expect(apiService).toHaveProperty('postAnything');
    });

    it('fetch products', async () => {
        const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
        fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockProducts),
        });
        const products = await apiService.getProducts();

        expect(fetch).toHaveBeenCalledWith(`${API_URL}/products`);
        expect(products).toEqual(mockProducts);
    });


    it('fetch product by ID', async () => {
        const mockProduct = { id: 1, name: 'Product 1' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockProduct),
        });
        const product = await apiService.getProductById(1);

        expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/1`);
        expect(product).toEqual(mockProduct);
    });

    it('handles server error', async () => {
        const anythingToPost = { data: 'test data' };
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: vi.fn().mockResolvedValueOnce({ message: 'Server error' }),
        });

        await expect(apiService.postAnything(anythingToPost)).rejects.toThrow('HTTP error! Status: 500');
    });
});