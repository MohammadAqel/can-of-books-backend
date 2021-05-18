'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
app.use(cors());
const callUser=require('./Models');
const newBook=require('./Models');
const deleteBook=require('./Models');




app.get('/', homePage);
app.get('/books', callUser);
app.post('./books',newBook);
app.delete('./books',deleteBook);

function homePage(req, res) {
  res.send(' Hi from Express');
}

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
