//модель в sequelize, преобразовываемая в таблицу в базе данных
module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        title:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        }
    })

    return Todo
}

