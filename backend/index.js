const express = require('express')
const cors = require('cors')
const connectDB = require('./db/database')
const userRoutes = require('./routes/users.route')
const postRoutes = require('./routes/posts.route')

const app = express()

app.use(express.json())
app.use(cors());
connectDB()

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`)
})