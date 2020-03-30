const express = require('express');
const app = express();
const connectDb = require('./config/db');
const cors = require('cors');

//Connect database
connectDb();

//Init middleware

app.use(express.json({extended: false}));
app.use(cors());

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contacts'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

