"use strict";

const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init(
    {
      // attributes
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg:
              "Please provide a value for 'title'",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg:
              "Please provide a value for 'description'.",
          },
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
      estimatedTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      materialsNeeded: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
    }
  );
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: "userId",
      allowNull: false,
    });
  };
  return Course;
};
