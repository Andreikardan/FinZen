'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('infoSliders', [{
        title: 'Можем круче',
        backgroundColor:'',
        text: 'Откройте все возможности FinZen с подпиской',
        img: 'stonks.jpg'
      },
      {
        title: 'Английский с Марией',
        backgroundColor:'',
        text: 'Улучшите свое произношение с курсами от носителя',
        img: '3.jpg'
      },
      {
        title: 'Глыба финалки',
        backgroundColor:'',
        text: 'Команда FinZen рассказывает как они изобретали Тинькофф 0.1',
        img: '1.jpg',
      },
      {
        title: 'Человек года',
        backgroundColor:'',
        text: 'Макс ты лучший!',
        img: '4.png'
      }], {});
   
  },

  async down (queryInterface, Sequelize) {
    
  
      await queryInterface.bulkDelete('infoSliders', null, {});
     
  }
};
