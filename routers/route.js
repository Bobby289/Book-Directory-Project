const { createUser,tokenGen,login,addBook,getBook,getBookById,buyBook,depositBook,deleteBook } = require('../controller/controller.js')
const { checkToken } = require('../auth.js');
const express = require('express');
const router = express.Router();
router.post('/register',createUser,tokenGen);
router.post('/login',login);
router.post('/addbook',checkToken,addBook);
router.get('/getbook',checkToken,getBook);
router.get('/getbook/:id',checkToken,getBookById);
router.patch('/depositBook',checkToken,depositBook);
router.patch('/buyBook',checkToken,buyBook);
router.delete('/deleteBook',checkToken,deleteBook);
module.exports = { router };