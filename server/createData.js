const sequelize = require('./db');
const MainItems = require('./models/MainItems');
const SubItems = require('./models/SubItems');

const mainItemsData = [
  { id: 1, name: "Book" },
  { id: 2, name: "Author" },
  { id: 3, name: "Genre" }
];

const subItemsData = [
  { name: "Alice in Wonderland", mainItemId: 1 },
  { name: "Good Girls Guide to Murder", mainItemId: 1 },
  { name: "Holly Jakson", mainItemId: 2 },
  { name: "J.K Rowling", mainItemId: 2 },
  { name: "Horror", mainItemId: 3 },
  { name: "Romance", mainItemId: 3 }
];

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection established successfully.");

    // Create tables (force:true drops and recreates)
    await sequelize.sync({ force: true });
    console.log("✅ Tables synced successfully.");

    await MainItems.bulkCreate(mainItemsData);
    await SubItems.bulkCreate(subItemsData);

    console.log("✅ Data inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    process.exit(1);
  }
})();