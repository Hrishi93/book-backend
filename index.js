 const express = require('express')
 const mongoose = require('mongoose')
 const bodyParser = require('body-parser')
 const app = express()
 const PORT = process.env.PORT || 5000;
 const Book = require('./Book')
 const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const mongourl = "mongodb+srv://sonumahure:wmbfM1TpfstBJnhO@cluster0.684ki.mongodb.net/FDP?retryWrites=true&w=majority&appName=Cluster0"
const localurl='mongodb://localhost:27017/FDP'
 mongoose.connect(localurl);
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

//get
 app.get('/getBooks',async(req,res)=>{
    const book = await Book.find();
    res.json(book);
 })

//post
 app.post('/books',async(req,res)=>{
    const {title, author, genre, publicationYear, availableCopies} = req.body;
    const book = new Book({
    title,
    author,
    genre,
    publicationYear,
    availableCopies
    })
    try{
        await book.save();
        res.status(201).send(book);
    }catch(err){
        res.status(400).send({message: err.message});
    }
 })

 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.delete('/delete/:id', async(req,res)=>{
    const id = req.params.id;
    const book =await Book.findByIdAndDelete(id)
    res.json({message: "Book deleted successfully"});
})
app.put('/put/:id', async(req,res)=>{
    const id = req.params.id;
    const updatedBook = req.body;
    const book =await Book.findByIdAndUpdate(id,updatedBook);
    
    res.json(updatedBook);
})