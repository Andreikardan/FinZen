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
        title: 'Дожить до деплоя',
        backgroundColor:'',
        text: 'Команда FinZen рассказывает как шла работа',
        img: '1.jpg',
      },
      {
        title: 'Сдается место',
        backgroundColor:'',
        text: 'По вопросам размещения обращаться к ежам',
        img: '4.jpg'
      }], {});
   
  },

  async down (queryInterface, Sequelize) {
    
  
      await queryInterface.bulkDelete('infoSliders', null, {});
     
  }
};
