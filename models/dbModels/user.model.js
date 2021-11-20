const Sequelize = require("sequelize")
const { sequelize } = require("../index")
const Todo = require("./todos.model")
const Token = require("./token.model")

class User extends Sequelize.Model { }

User.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
  },

  { sequelize: sequelize, underscored: true, modelName: "user" }
);

User.hasMany(Todo)
User.hasMany(Token)
Token.belongsTo(User, {
  foreignKey: "userId",
})
Todo.belongsTo(User, {
  foreignKey: "userId",
})

module.exports = User