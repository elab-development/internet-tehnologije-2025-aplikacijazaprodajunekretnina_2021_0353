require('dotenv').config();
require('pg'); // Eksplicitno učitavanje za Vercel/Sequelize
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const clientRoutes = require('./routes/clientRoutes');
const externalApiRoutes = require('./routes/externalApiRoutes');
const statsRoutes = require('./routes/statsRoutes');
const interactionRoutes = require('./routes/interactionRoutes');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Rute
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/external', externalApiRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/users', userRoutes);

// Swagger konfiguracija
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Real Estate CRM API',
      version: '1.0.0',
      description: 'API specifikacija za sistem prodaje nekretnina',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Putanja do fajlova sa rurama
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Root ruta
app.get('/', (req, res) => {
  res.send('CRM Real Estate API is running...');
});

// Health Check rutua
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
