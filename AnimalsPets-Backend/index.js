require('dotenv').config();
const express = require('express');
const cors = require('cors')

const { dbconnetion } = require('./config/conectionDB');
dbconnetion();
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

app.use('/api/elephants', require('./routes/elephants'))
app.use('/api/login', require('./routes/login'))




app.listen(process.env.PORT, () => {
  console.log(
    'Server escuchando en el puerto: \x1b[32m%s\x1b[0m',
    process.env.PORT,
    );
  });