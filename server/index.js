require('dotenv').config();
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

// Rute
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/external', externalApiRoutes);
app.use('/api/stats', statsRoutes);

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
