import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import fs from "fs"
import mongoose from "mongoose"
import multer from "multer"
import GridFsStorage from "multer-gridfs-storage"

var files = []

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/health', (req, res) => {
    res.status(200).send("Health status OK!")
})

app.get('/', (req, res) => {
    res.sendFile(`${process.env.PROJECT_PATH}` + "index.html")
})

app.post('/example', (req, res) => {
    res.send(`File name is: ${req.body.fname}.`);
    console.log(req.body.fname)
    var writeStream = fs.createWriteStream(`${req.body.fname}`);
    writeStream.write(`${req.body.fcontents}`);
    writeStream.end();
    files.push(writeStream);
    console.log(files.length);
});

export default app