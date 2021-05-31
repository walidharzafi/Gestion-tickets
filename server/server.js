const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
require('dotenv/config');
const PORT = process.env.PORT || 4000

const userRouter = require('./routes/users.routes')
const ticketRouter = require('./routes/tickets.routes')
const departmentRouter = require('./routes/departement.routes')
const assignRouter = require('./routes/assigns.routes')
const { verifyIsAuth } = require('./middleware/auth.middleware')

mongoose.connect(process.env.URL_MONGODB, 
    {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('Datatbase Connected')
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

// routes
app.use('/api', userRouter)
app.use('/api/ticket', ticketRouter)
app.use('/api/department', departmentRouter)
app.use('/api/assign', assignRouter)
app.use('*',verifyIsAuth, (req, res, next) => {
    next()
})


app.listen(PORT, (err) => {
    if(err) return console.log(err)

    console.log(`Your server lesting on port ${PORT}`)
})