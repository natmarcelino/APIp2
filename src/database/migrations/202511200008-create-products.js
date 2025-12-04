'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING,
      slug: Sequelize.STRING,
      description: Sequelize.TEXT,
      price: Sequelize.DECIMAL(10, 2),

      productCategoryId: {
        type: Sequelize.INTEGER,
        references: { model: 'ProductCategories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      productSituationId: {
        type: Sequelize.INTEGER,
        references: { model: 'ProductSituations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Products');
  }
};
