'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.Wishlist,
        foreignKey: 'EventId',
        otherKey: 'UserId',
      })

      this.hasMany(models.Wishlist, { foreignKey: 'EventId' });
      this.belongsTo(models.Category, {});
      this.hasMany(models.Ticket, { foreignKey: 'EventId' });
    }
  }
  Event.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    location: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};