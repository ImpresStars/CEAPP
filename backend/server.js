const express = require('express');
const { Surreal } = require('surrealdb.js');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Database connection state
let dbConnection = null;
let isDbConnected = false;

// Database connection function
async function connectToDatabase() {
  if (isDbConnected) return;

  try {
    const db = new Surreal(process.env.SURREALDB_URL);
    
    await db.signin({
      user: process.env.SURREALDB_USER,
      pass: process.env.SURREALDB_PASS,
    });
    
    await db.use(process.env.SURREALDB_NS, process.env.SURREALDB_DB);
    
    dbConnection = db;
    isDbConnected = true;
    
    console.log('Connected to SurrealDB');
    
    // Initialize tables if needed
    await initializeTables();
    
  } catch (error) {
    console.error('Error connecting to SurrealDB:', error);
    isDbConnected = false;
    throw error;
  }
}

// Database middleware
app.use(async (req, res, next) => {
  if (!isDbConnected) {
    try {
      await connectToDatabase();
    } catch (error) {
      return res.status(500).json({ 
        error: 'Database connection failed',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
  req.db = dbConnection;
  next();
});

// Initialize required tables
async function initializeTables() {
  try {
    // Ensure required tables exist
    const tables = [
      'bookings',
      'clients',
      'workers',
      'services',
      'addresses',
      'vehicles'
    ];

    for (const table of tables) {
      await dbConnection.query(`
        DEFINE TABLE ${table} SCHEMAFULL;
        DEFINE FIELD created_at ON TABLE ${table} TYPE datetime;
        DEFINE FIELD updated_at ON TABLE ${table} TYPE datetime;
      `);
    }

    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing tables:', error);
    throw error;
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    dbConnected: isDbConnected,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/workers', require('./routes/workers'));
app.use('/api/services', require('./routes/services'));
app.use('/api/addresses', require('./routes/addresses'));
app.use('/api/vehicles', require('./routes/vehicles'));

// Start server
async function startServer() {
  try {
    await connectToDatabase();
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();