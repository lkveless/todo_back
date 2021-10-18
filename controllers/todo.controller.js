const db = require('../models/todo.index')
const Todo = db.todos
//Op нужен для адаптации логики sql-запросов в sequelize 
const Op = db.Sequelize.Op

//Функция, отвечающая за создание todo и добавления в базу данных
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "title can not be empty!"
        })
        return
    }

    const todo = {
        title: req.body.title,
        description: req.body.description,
    }

    Todo.create(todo)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err })
        })
}

//Функция для получения всех существующих todo
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Todo.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message
        });
      });
  };

//Функция для получения конкретного todo по его id
exports.findOne = (req, res) => {
    const id = req.params.id
    Todo.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err })
        })
}

//Функция для изменения уже существующего todo
exports.update = (req, res) => {
    const id = req.params.id
    Todo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "success" })
            }
            else { res.send({ message: `cant update with id = ${id}` }) }
        })
        .catch(err => {
            res.send({ message: err })
        })
}

//Функция для удаления всех todo из таблицы
exports.deleteAll = (req, res) => {
    Todo.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} success` })
        })
        .catch(err => {
            res.send({ message: err })
        })
}

//Функция для удаления конкретного todo по его id
exports.deleteOne = (req, res) => {
    const id = req.params.id
    Todo.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "success" })
            }
            else {
                res.send({ message: `cant delete with id = ${id}` })
            }
        })
        .catch(err => {
            res.send({ message: err })
        })
}