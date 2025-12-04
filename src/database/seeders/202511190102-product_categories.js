'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('ProductCategories', [
      { name: 'Comidas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Eletrônicos', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('ProductCategories', null, {});
  }
};
