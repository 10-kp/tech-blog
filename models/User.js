const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {//define ID column
    id: {
      // use Sequelize DataTypes object to provide type of data  
      type: DataTypes.INTEGER,

      // equivalent of "NOT NULL" in  SQL
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  //define Username column
      username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    //define password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // password must be at least five characters long
      validate: {
        len: [5],
      },
    },
  },
  {
    //beforeCreate lifecycle "hook" functionality
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    // beforeUpdate lifecycle "hook" functionality

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },

    //imported sequelize connection (the direct connection to database)
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    }
);

module.exports = User;
