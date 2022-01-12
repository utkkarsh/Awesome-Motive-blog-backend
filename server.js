const app = require("./index");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === "prod") {
  require("./helpers/init_mongodb"); // Connection to MongoDb

  app.listen(PORT, () => {
    console.info(`Server running on PORT = ${PORT}`);
  });
}
