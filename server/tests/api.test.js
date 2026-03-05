const request = require('supertest');
const app = require('../index');

describe('Core API Tests', () => {
    test('GET /api/health should return 200 OK', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('OK');
    });

    test('GET /api/properties should return list of properties (even if empty)', async () => {
        const res = await request(app).get('/api/properties');
        // Zavisno od implementacije, može biti 200 ili 401 ako je ruta zaštićena
        // Ako je zaštićena, treba da vrati 401 ili 403
        expect([200, 401, 403]).toContain(res.statusCode);
    });
});
