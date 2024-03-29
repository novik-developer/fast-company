const express = require("express");
const config = require("config");
const chalk = require("chalk");
const mongoose = require("mongoose");
const initDatabase = require("./startUp/initDatabase.js");
const routes = require("./routes");

const app = express();

// midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

const PORT = config.get("port") ?? 8080;

// if (process.env.NODE_ENV === "production") {
//     console.log("production");
// } else {
//     console.log("development");
// }

async function start() {
    try {
        mongoose.connection.once("open", () => {
            initDatabase();
        });
        await mongoose.connect(config.get("mongoURI"));
        app.listen(PORT, () => {
            console.log(chalk.green(`Server is running on port ${PORT}...`));
        });
    } catch (error) {
        console.log(chalk.red(error.message));
        process.exit(1);
    }
}

start();
