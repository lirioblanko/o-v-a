import { toISOString } from '/src/helpers.js';

describe('toISOString function', () => {
    it('formats date to yyyy-MM-dd format', () => {
        const date = new Date('2022-03-15T12:00:00');
        const result = toISOString(date);

        expect(result).toBe('2022-03-15');
    });
});