import  express  from "express";
import bodyParser from "body-parser";
const app = express()
import dotenv from "dotenv"
import bookRouter from './routes/book.js';
dotenv.config()
app.use(bodyParser.json())
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400) {
      return res.status(400).send({ error: 'Invalid JSON' });
  }
  next();
});


app.use('/books', bookRouter);

app.get("/", (req,res)=>{
  res.send("Holla ")
})








const port = process.env.PORT
console.log(process.env.PORT);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})