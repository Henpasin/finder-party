'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'UserId' });
      this.belongsTo(models.Event, { foreignKey: 'EventId' });
    }
  }
  Ticket.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER,
    status: {
      type : DataTypes.INTEGER,
      defaultValue : 'false'
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};