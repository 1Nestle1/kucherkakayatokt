const { sequelize, Account, Category, Transaction } = require('./models');

async function seed() {
  // sync({ force: true }) пересоздаёт таблицы
  await sequelize.sync({ force: true });
  console.log('Таблицы созданы');

  await Account.bulkCreate([
    { name: 'Карта Сбербанк', balance: 25000 },
    { name: 'Наличные', balance: 3000 },
    { name: 'Накопительный счёт', balance: 100000 },
  ]);

  await Category.bulkCreate([
    { name: 'Еда' },
    { name: 'Транспорт' },
    { name: 'Зарплата' },
    { name: 'Развлечения' },
  ]);

  await Transaction.bulkCreate([
    { title: 'Зарплата за октябрь', amount: 60000, type: 'income', accountId: 1, categoryId: 3 },
    { title: 'Продукты', amount: 2500, type: 'expense', accountId: 1, categoryId: 1 },
    { title: 'Проездной', amount: 1200, type: 'expense', accountId: 1, categoryId: 2 },
    { title: 'Кино', amount: 700, type: 'expense', accountId: 2, categoryId: 4 },
    { title: 'Обед в столовой', amount: 350, type: 'expense', accountId: 2, categoryId: 1 },
  ]);

  console.log('Тестовые данные добавлены');
}

seed().then(() => sequelize.close());
