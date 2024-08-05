import express from "express"
import cors from "cors"
import { connectDB } from "./db/connect_db.js";
import { userRouter } from "./routes/user.js";
import { config } from "dotenv";
import connection from "./db/connect_mysql.js";

let PORT = process.env.PORT || 8000

config({
    path: "./config.env",
  });
  

//setting up cross origin 
export const app = express();


app.use(cors())
app.use(express.json())

app.use("/hello", userRouter)
app.use("/", userRouter);


// Test DB Connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err.stack);
  } else {
    console.log('Connected to MySQL as ID ' + connection.threadId);
  }
});

app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`)
})