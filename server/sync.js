const sequelize = require('./db');
require('./models/MainItems');
require('./models/SubItems');


sequelize.sync({ force: true })  // force: true will drop tables if they exist
  .then(() => {
    console.log('✅ Tables created successfully');
    process.exit();
  })
  .catch(err => console.error(err));

  