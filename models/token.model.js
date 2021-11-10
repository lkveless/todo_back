const Sequelize = require("sequelize")
const { sequelize } = require("./todo.index")
class Token extends Sequelize.Model {}

Token.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    value: {
      type: Sequelize.STRING,
      defaultValue:''
    },
  },

  { sequelize: sequelize, underscored: true, modelName: "token" }
);

module.exports = Token