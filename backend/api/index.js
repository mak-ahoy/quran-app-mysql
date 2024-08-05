import express from "express"
import cors from "cors"
import { config } from "dotenv";
import { connectDB } from '../db/connect_db.js'; // Ensure the correct relative path
import { userRouter } from '../routes/user.js'; // Adjust if necessary

let PORT = process.env.PORT || 8000

// config({
//     path: "./config.env",
//   });
  

//setting up cross origin 
export const app = express();


app.use(cors())
app.use(express.json())

app.use("/", userRouter);

connectDB();
app.listen(PORT, () => {
  console.log(`Server listening on 5000 http://localhost:${PORT}`);
});

export default app;