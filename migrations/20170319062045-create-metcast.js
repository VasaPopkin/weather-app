'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Metcasts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      temp: {
        type: Sequelize.FLOAT
      },
      pressure: {
        type: Sequelize.INTEGER
      },
      humidity: {
        type: Sequelize.INTEGER
      },
      icon: {
        type: Sequelize.STRING
      },
      openweather_updated: {
        type: Sequelize.DATETIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Metcasts');
  }
};