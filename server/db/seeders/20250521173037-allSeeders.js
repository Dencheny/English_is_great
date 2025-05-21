'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Users
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Alice',
          email: 'alice@example.com',
          password: 'hashedpassword1',
        },
        { name: 'Bob', email: 'bob@example.com', password: 'hashedpassword2' },
        {
          name: 'Charlie',
          email: 'charlie@example.com',
          password: 'hashedpassword3',
        },
        {
          name: 'David',
          email: 'david@example.com',
          password: 'hashedpassword4',
        },
        { name: 'Eve', email: 'eve@example.com', password: 'hashedpassword5' },
      ],
      {}
    );

    // Themes
    await queryInterface.bulkInsert(
      'Themes',
      [
        { themeName: 'Еда' }, // id: 1
        { themeName: 'Аэропорт' }, // id: 2
        { themeName: 'Знакомство с другом' }, // id: 3
      ],
      {}
    );

    // Words
    await queryInterface.bulkInsert(
      'Words',
      [
        { english: 'apple', russian: 'яблоко', themeId: 1, authorId: 1 },
        { english: 'bread', russian: 'хлеб', themeId: 1, authorId: 1 },
        { english: 'cheese', russian: 'сыр', themeId: 1, authorId: 1 },
        { english: 'chicken', russian: 'курица', themeId: 1, authorId: 1 },
        { english: 'water', russian: 'вода', themeId: 1, authorId: 1 },
        { english: 'salt', russian: 'соль', themeId: 1, authorId: 1 },

        // АЭРОПОРТ (themeId: 2)
        { english: 'passport', russian: 'паспорт', themeId: 2, authorId: 2 },
        { english: 'luggage', russian: 'багаж', themeId: 2, authorId: 2 },
        { english: 'ticket', russian: 'билет', themeId: 2, authorId: 2 },
        {
          english: 'gate',
          russian: 'выход на посадку',
          themeId: 2,
          authorId: 2,
        },
        {
          english: 'boarding pass',
          russian: 'посадочный талон',
          themeId: 2,
          authorId: 2,
        },
        { english: 'departure', russian: 'вылет', themeId: 2, authorId: 2 },

        // ЗНАКОМСТВО С ДРУГОМ (themeId: 3)
        { english: 'hello', russian: 'привет', themeId: 3, authorId: 3 },
        {
          english: 'nice to meet you',
          russian: 'приятно познакомиться',
          themeId: 3,
          authorId: 3,
        },
        {
          english: 'how are you?',
          russian: 'как дела?',
          themeId: 3,
          authorId: 3,
        },
        {
          english: 'what is your name?',
          russian: 'как тебя зовут?',
          themeId: 3,
          authorId: 3,
        },
        { english: 'friend', russian: 'друг', themeId: 3, authorId: 3 },
        {
          english: 'I am fine',
          russian: 'у меня всё хорошо',
          themeId: 3,
          authorId: 3,
        },
      ],
      {}
    );

    // LearnWord (10 записей)
    await queryInterface.bulkInsert(
      'LearnWords',
      [
        { wordId: 1, userId: 1, themeId: 1 },
        { wordId: 2, userId: 1, themeId: 1 },
        { wordId: 3, userId: 1, themeId: 1 },

        { wordId: 4, userId: 2, themeId: 2 },
        { wordId: 5, userId: 2, themeId: 2 },

        { wordId: 6, userId: 3, themeId: 2 },

        { wordId: 7, userId: 4, themeId: 3 },
        { wordId: 8, userId: 4, themeId: 3 },
        { wordId: 9, userId: 4, themeId: 3 },

        { wordId: 1, userId: 5, themeId: 1 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('LearnWords', null, {});
    await queryInterface.bulkDelete('Words', null, {});
    await queryInterface.bulkDelete('Themes', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
