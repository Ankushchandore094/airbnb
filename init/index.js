// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");


// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//     .then(() => {
//         console.log("connected to DB");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// async function main() {
//     await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) => ({...obj, owner: "6838119daf525cfe4d6b3bf5"}));
//     await Listing.insertMany(initData.data);
//     console.log("DB was initialized");
//     await mongoose.connection.close();
// };

// initDB();


const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("✅ Connected to DB");
  })
  .catch((err) => {
    console.log("❌ DB Connection Error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    // Step 1: Delete old data
    await Listing.deleteMany({});
    console.log("🧹 Old listings deleted");

    // Step 2: Add owner ID to each listing
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "6838119daf525cfe4d6b3bf5", // 👈 replace this with a real user _id if needed
    }));

    // Step 3: Insert all listings
    const inserted = await Listing.insertMany(initData.data, { ordered: false });
    console.log(`✅ ${inserted.length} listings inserted successfully`);

  } catch (err) {
    console.log(" Error during DB initialization:", err.message);
  } finally {
    // Step 4: Close DB connection
    await mongoose.connection.close();
    console.log("🔌 DB connection closed");
  }
};

// Run it
initDB();
