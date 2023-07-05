'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Event, {
        through: models.Wishlist,
        foreignKey: 'UserId',
        otherKey: 'EventId',
      })

      this.hasMany(models.Wishlist, { foreignKey: 'UserId' });
      this.hasMany(models.Ticket, { foreignKey: 'UserId' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    
    hooks: {
      beforeCreate: (user, options) => {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
        user.password = hashedPassword;
      }
    },

    sequelize,
    modelName: 'User',
  });
  return User;
};