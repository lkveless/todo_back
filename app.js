const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Подключение к базе данных через sequelize
const db = require('./models/todo.index');
db.sequelize.sync()

//Функция, отвечающая за сброс всех таблиц и значений базы данных, для первого запуска программы небходимо раскомментировать, при последующих - закомментировать.
//db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
//});


const PORT = process.env.PORT || 8080
app.listen(PORT, () => { console.log(`server is listening on ${PORT}`) })

app.get('/', (req, res) => {
  res.json("welcome to the todo application")
})
require('./routes/todos.routes')(app)

