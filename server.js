'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
app.use(cors());

mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,

});

const usersSchema = new mongoose.Schema({
  email: String,
  books: [bookSchema],
});

// const BookModel = mongoose.model('bookModel', bookSchema);
const UsersModel = mongoose.model('UsersModel', usersSchema);
console.log(typeof(bookSchema));
function seedUsers() {
  const Jaradat = new UsersModel({
    email :'Mohammad Jaradat',
    books:[{
      name: 'The Lord of the Rings',
      description: 'The dark, fearsome Ringwraiths are searching for a Hobbit.',
      status: 'Most people have seen the epic movie, but have you read the book?'
    },
    {
      name: 'War and Peace',
      description:'War and Peace broadly focuses on Napoleon’s invasion of Russia in 1812 and follows three of the most well-known characters in literature',
      status: 'Nominated as one of America’s best-loved novels by PBS’s The Great American Read'
    },
    {
      name: 'Ulysses',
      description:'This revised volume follows the complete unabridged text as corrected in 1961. Contains the original foreword by the author and the historic court ruling to remove the federal ban. It also contains page references to the first American edition of 1934.',
      status: 'Joyce’s parallel use of The Odyssey…has the importance of a scientific discovery'
    },]});

  Jaradat.save();
}

// seedUsers();



function callUser (req,res){

  UsersModel.find( {email:/Mohammad Jaradat/},'books',function (err, User) {
    if (err) return console.error(err);
    console.log(User.email);
    res.send(User);
  });

}

app.get('/', homePage);
app.get('/books', callUser);

function homePage(req, res) {
  res.send(' Hi from Express');
}

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
