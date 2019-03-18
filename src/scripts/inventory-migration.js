/* eslint-disable no-console */
const db = require('../services/database');

db('users')
  .whereNotNull('inventory')
  .then(async users => {
    await Promise.all(
      users.map(user => {
        const inventory = user.inventory.split('|').map(item => {
          const [id, quantity] = item.split(':');
          return { id, quantity: parseInt(quantity) };
        });
        console.log(user.username, inventory);
      })
    );
  })
  .catch(console.error)
  .then(process.exit);
