const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
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
    email :'muhmadjradat@gmail.com',
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

  UsersModel.find({email:'muhmadjradat@gmail.com'},'books', function (err, User) {
    if (err) return console.error(err);
    console.log(User);
    res.send(User[0].books);
  });

}

function newBook(req, res) {
  const { name, email, description } = req.body;
  console.log(req.body);
  UsersModel.find({ email:email}, (error, userData) => {
    console.log(userData);
    userData[0].books.push({
      name: name,
      description: description,
    });
    userData[0].save();
    res.send(userData[0].books);
  });
}

function deleteBook(req, res) {
  // TODO: get the index
  const index = Number(req.params.index);
  console.log(req.params);
  // TODO: get the owner name
  const { email } = req.query;
  // TODO: find the owner
  UsersModel.find({ email: email }, (err, data) => {
    // TODO: filter the cats for the owner and remove the one that matches the index

    const newBookData = data[0].books.filter((book, idx) => {
      return idx !== index;
    });
    data[0].books = newBookData;
    data[0].save();

    // TODO: respond back to the user with a message that the cat has been deleted
    res.send(' Cat deleted!');
  });
}

function updateBook (req, res) {
  const index = Number(req.params.index);
  const {email, name, description, status} = req.body;
  const updatedData = {
    name: name,
    description: description,
    status: status
  };
  UsersModel.find({email: email}, (error, book) =>{

    book[0].books.splice(index, 1, updatedData);
    book[0].save();
    res.send(book[0].books);
  });
}


module.exports = {
  callUser,
  newBook,
  deleteBook,
  updateBook,
};
