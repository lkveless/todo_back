const express = require('express')
const app = express()
const apiAuthRouter = require('./controllers/auth.controller')
const apiTodoRouter = require('./controllers/todo.controller')
const apiUserRouter = require('./controllers/user.controller')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const { notFound, errorHandler, asyncHandler } = require('./middleware/middleware')
const { initDB } = require('./models/todo.index.js')

initDB()



app.use((req, res, next) => {
  console.log('URL = ', req.url)
  console.log('Original_URL = ', req.originalUrl)
  console.log('METHOD = ', req.method)
  console.log('HOST = ', req.headers.host)
  console.log('IsSecure = ', req.secure)
  console.log('BODY', req.body)
  console.log('QUERY', req.query)

  next()
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => { console.log(`server is listening on ${PORT}`) })

app.get('/', (req, res) => {
  res.json("welcome to the todo application")
})
app.use('/api/todos', apiTodoRouter)
app.use('/api/auth', apiAuthRouter)
app.use('/api/user', apiUserRouter)
