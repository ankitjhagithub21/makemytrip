require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/conn')
const placeRouter = require('./routes/placeRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const hotelRouter = require('./routes/hotelRoutes')
const app = express()
const port = process.env.PORT

connectDB()

app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))
app.use(cookieParser())


app.get('/', (req, res) => {
  res.json({message:"Api working."})
})

app.use("/api/places",placeRouter)
app.use("/api/users",userRouter)
app.use("/api/reviews",reviewRouter)
app.use("/api/hotels",hotelRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

