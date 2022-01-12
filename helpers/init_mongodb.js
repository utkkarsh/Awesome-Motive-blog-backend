const mongoose = require("mongoose"); // new
require("dotenv").config();

// Connect to MongoDB database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: "true",
});

mongoose.connection.on("error", (err) => {
  console.info("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.info("mongoose is connected to db");
});
mongoose.connection.on("disconnected", () => {
  console.info("mongoose is disconnected");
});

// Function to close mongoose connection before shutting the Server down.
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

// Further processing (if any)
