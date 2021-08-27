const express = require('express')
const cors = require('cors')
const connectDB = require('./db/database')


const app = express()

app.use(express.json())
app.use(cors());
connectDB()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`)
})