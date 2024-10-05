import Router from "express";
import {createNewBook, deleteBook, getAllBooks, getSelectedBook, updateBook} from "../collectors/books.js"


const bookRouter = Router();
bookRouter.get("/:id" , getSelectedBook)
bookRouter.get("/", getAllBooks)
bookRouter.post("/", createNewBook)
bookRouter.delete("/:id", deleteBook)
bookRouter.patch("/:id" , updateBook)





export default bookRouter;