'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Enums } = require('../utils/common');
const { PENDING, BOOKED, CANCELLED, INITIALIZED} = Enums.BOOKING_STATUS;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: [PENDING, BOOKED, CANCELLED, INITIALIZED],
        defaultValue: INITIALIZED,
        allowNull: false
      },
      noOfSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      totalCost: {
        type: Sequelize.INTEGER,
        allowNull: false
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};