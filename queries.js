const { Op } = require('sequelize');
const { sequelize, Account, Category, Transaction } = require('./models');

async function main() {
  // 1. findAll — все счета
  const accounts = await Account.findAll();
  console.log('1. Все счета:');
  accounts.forEach((a) => console.log(`   ${a.id}. ${a.name} — ${a.balance} ₽`));

  // 2. findByPk — транзакция по id
  const tr = await Transaction.findByPk(2);
  console.log('\n2. Транзакция с id=2:', tr.title, tr.amount);

  // 3. findAll + where — только расходы
  const expenses = await Transaction.findAll({ where: { type: 'expense' } });
  console.log('\n3. Расходы:');
  expenses.forEach((t) => console.log(`   ${t.title}: ${t.amount} ₽`));

  // 4. findAll + include — транзакции со счётом и категорией
  const withRelations = await Transaction.findAll({ include: [Account, Category] });
  console.log('\n4. Транзакции со счётом и категорией:');
  withRelations.forEach((t) =>
    console.log(`   ${t.title} | ${t.Account.name} | ${t.Category.name}`)
  );

  // 5. create — новая транзакция
  const created = await Transaction.create({
    title: 'Такси',
    amount: 450,
    type: 'expense',
    accountId: 1,
    categoryId: 2,
  });
  console.log('\n5. Создана транзакция:', created.id, created.title);

  // 6. Бонус: where + Op.gt — крупные суммы (больше 1000)
  const big = await Transaction.findAll({ where: { amount: { [Op.gt]: 1000 } } });
  console.log('\n6. Суммы больше 1000:', big.map((t) => t.title).join(', '));
}

main().then(() => sequelize.close());
