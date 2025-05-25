const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.use(express.json());



// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(bodyParser.json()); 

// Routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const visitorRoutes = require('./routes/visitorRoutes');
app.use('/visitors', visitorRoutes);

const entryRoutes = require('./routes/entryRoutes');
app.use('/entries', entryRoutes);

const protectedRoutes = require('./routes/protected');
app.use('/protected', protectedRoutes); 

// Server 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('secret key:', process.env.SECRET_KEY);
});
