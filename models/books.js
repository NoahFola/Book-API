import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    bookTitle : {
        type : String,
        required : true
    },
    Author: {
        type : String,
        required : true
    },
    Genre: {
        type : String,
        required : true
    } 
  });

const Book = mongoose.model("Book", bookSchema);

export default Book;