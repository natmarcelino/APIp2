'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Categories', [
      {
        id: 'b1e4ec01-0000-4b00-9000-000000000001',
        name: 'Iluminação',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b1e4ec01-0000-4b00-9000-000000000002',
        name: 'Lixo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
