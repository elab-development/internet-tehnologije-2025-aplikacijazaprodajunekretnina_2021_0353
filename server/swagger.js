const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CRM Nekretnine API',
        description: 'API dokumentacija za seminarski rad iz Internet Tehnologija',
    },
    host: 'localhost:5000',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js']; // U budućnosti se mogu dodati fajlovi sa rutama

swaggerAutogen(outputFile, endpointsFiles);
