const express = require('express')
const app = express()
const { sequelize} = require('./src/models')
const userRouter = require('./src/routes/user')
const postRouter = require('./src/routes/post')
app.use(express.json())

// routers defining

app.use('/user', userRouter)
app.use('/post', postRouter)

// ---------Listen Function---------

app.listen({ port: 2000 }, async () => {
    console.log("the server is running in http://localhost:2000");
    await sequelize.authenticate()
    console.log("Data base connected");
})