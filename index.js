import dotenv from "dotenv"
dotenv.config()
import app from "./server.js"
import mongodb from "mongodb"

const MongoClient = mongodb.MongoClient

let connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DOMAIN}/`

const port = process.env.PORT

MongoClient.connect(
    connectionString,
    {
        maxPoolSize: 50, //at a time 50 users can connect to the application
        wtimeoutMS: 500, // will try to connect till 5s and if it doesn't connect it will timeout
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })