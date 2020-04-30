"use strict";

const {
  Sequelize,
  DataTypes,
} = require("sequelize");

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "First name cannot be null",
          },
          notEmpty: {
            msg: "First name is required",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last name cannot be null",
          },
          notEmpty: {
            msg: "Last name is required",
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        //! EXCEED EXPECTATION 1-2 : find the email address already exist

        validate: {
          notNull: {
            msg: "Email cannot be null",
          },
          isEmail: {
            msg: "Valid email is required",
          },
          isUnique(value) {
            return User.findOne({
              where: { emailAddress: value },
            }).then((emailAddress) => {
              if (emailAddress) {
                throw new Error(
                  "Sry, the email is already taken"
                );
              }
            });
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password cannot be null!",
          },
          notEmpty: {
            msg: "Password is quired",
          },
        },
      },
    },
    { sequelize }
  );
  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: "userId",
      allowNull: false,
    });
  };
  return User;
};
