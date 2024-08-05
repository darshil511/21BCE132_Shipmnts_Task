import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json()); 

app.get('/health', (req, res) => {
    res.status(200).send("Health status OK!")
})

export default app