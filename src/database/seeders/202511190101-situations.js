'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('ProductSituations', [
      { name: 'Novo', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Usado', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('ProductSituations', null, {});
  }
};
