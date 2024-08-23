const mongoose = require('mongoose')
const bookSchema =  new mongoose.Schema({
    title: {type:String,required :true},
    author: {type:String,required :true},
    genre : {type:String},
    publicationYear: { type: Number },
    availableCopies: { type: Number, default: 1 },
    borrowers: { type: [String] }

})
module.exports = mongoose.model('Book', bookSchema);