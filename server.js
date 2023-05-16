const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://fstv_electro:Crdi6iVOFpYt0JTA@cluster0.thdexvi.mongodb.net/my_contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
