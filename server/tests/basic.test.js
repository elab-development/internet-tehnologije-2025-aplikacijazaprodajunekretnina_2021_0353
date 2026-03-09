const request = require('supertest');
const express = require('express');
const app = express();

app.get('/api/test', (req, res) => {
    res.status(200).json({ message: 'Radi!' });
});

describe('Osnovni testovi rutiranja', () => {
    it('Provera test rute', async () => {
        const res = await request(app).get('/api/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });
});
