const Sequelize = require("sequelize")
const { sequelize } = require("../index")

class ToDo extends Sequelize.Model { }

ToDo.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    title: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    description: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    isCompleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isFavourite: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: Sequelize.SMALLINT,
      defaultValue: 0,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "todo" }
)

module.exports = ToDo
