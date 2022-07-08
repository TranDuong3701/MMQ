const dotenv = require("dotenv");
const dbConfig = require("./config/dbConfig");
dotenv.config();
dbConfig.connectDb();

const app = require("./app");

const port = process.env.PORT || 8000;
app.listen(8000, () => console.log(`App running on port ${port}`));
