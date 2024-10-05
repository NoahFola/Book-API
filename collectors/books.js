import connectToDatabase from "../config/db.js"
import Book from "../models/books.js"







export const getAllBooks = async (req,res)=>{
    try{
    await connectToDatabase().then(
    res.send(await Book.find())
    )}
    catch(err){
        res.send(`Couldn't connect to database: ${err}`)
        console.log(err);
    }
}



export const getSelectedBook = async (req , res)=>{
    try{
    await connectToDatabase().then(
    res.send(await Book.findById(req.params.id).catch((err)=>{
        return "Book not found"
    }))
    )}
    catch(err){
        res.send("Couldn't connect to database")
        console.log(err);
    }
}

export const createNewBook = async (req,res)=>{
    try {
        let userBook = req.body
        if(typeof(userBook.bookTitle) == "string" && typeof(userBook.Author) == "string" && typeof(userBook.Genre) == "string" && Object.keys(userBook).length <= 3 ){
            const newBook = new Book(userBook)
            await connectToDatabase()
            .then(async ()=>{
                await newBook.save()
                .then(res.send(`Book saved successfully \n ${newBook}`))
            })
        }else{
            res.send("Invalid Book Format")
        }
    } catch (error) {
        console.log(error)
        res.send("Couldn't create new book")
    }
}   



export const deleteBook = async (req, res) => {
    try {        
        await connectToDatabase();
        const result = await Book.deleteOne({ "_id": req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).send("Book not found");
        }
        
        res.send("Book deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while deleting the book");
    }
};


export const updateBook = async (req , res) => {
    try {
        const id = req.params.id
        const update = req.body

        await connectToDatabase()
        try {
            const result = await Book.updateOne({"_id" : id}, update)
            if (result.acknowledged) {
                if (result.matchedCount > 0) {
                    if (result.modifiedCount > 0) {
                        res.send('Update successful.');
                    } else {
                        res.send('No changes made; document was already up to date.');
                    }
                } else {
                    res.send('No document found with that ID.');
                }
            } else {
                res.send('Update not acknowledged.');
            }

        } catch (error) {
            res.send("Couldn't update book")
            console.log(error);
        }
       
        
    } catch (error) {
        console.log(error);
    }
}