require("dotenv").config();
const db = require("./config/db");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/index");

app.use(express.json({ limit: "50mb" }));

db.Sequelize.sync({ alter: true })
.then(() => {
    console.log("Synced db.");
})
.catch((err) => {
    console.log("Failed to synced db:" + err.message);
});

app.use("/api", routes);


app.listen(port, () => {
  console.log(`starting port on http://localhost:${port}`);
});
