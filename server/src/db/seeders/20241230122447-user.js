'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Users', [{
       email: 'asd@asd.ru',
        password:  await bcrypt.hash('asdASD123!',10),
        username:'Admin'
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
 
   
     
      await queryInterface.bulkDelete('Users', null, {});
     
  }
};
