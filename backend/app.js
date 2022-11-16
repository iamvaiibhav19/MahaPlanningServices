const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const app = express();

dotenv.config({ path: "./config/.env" });

app.use(cors({
    origin: true, credentials: true
}))

app.use(cookieParser());

app.use(
    express.urlencoded({ extended: true })
);
    
app.use(express.json());

const form = require("./routes/formRoute");
const defaultRoute = require("./routes/defaultRoute");
const user = require("./routes/userRoute");


app.use("/", defaultRoute);
app.use("/api/v1", form);
app.use("/api/v1", user);

module.exports = app;
