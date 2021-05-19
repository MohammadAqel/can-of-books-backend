'use strict';
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const Modals=require('./Models');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  'mongodb://localhost:27017/books',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get('/', homePage);
app.get('/books', Modals.callUser);
app.post('/books',Modals.newBook);
app.delete('/books/:index',Modals.deleteBook);
app.put('/books/:index', Modals.updateBook);

function homePage(req, res) {
  res.send(' Hi from Express');
}

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
