import express from 'express'
const postsRouter = require('./routers/posts')
const cors = require('cors')
const { handleError } = require('./utils/error')
const auth = require('../src/middleware/auth')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(auth.initialize()) // For iniitializing passport

const port = process.env.PORT || 8080
app.use(cors())

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})

app.use('/posts', postsRouter)
app.use(handleError)
