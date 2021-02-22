const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const PORT = 8000;

// Import Router and Config
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const soalRouter = require("./routes/soal");
const keys = require("./config/keys");

const app = express();

const db = mongoose.connection;

// Connect to Database
mongoose.connect(keys.db.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
	console.log("Connection to the database has established");
});

// Configuration
app.use(express.static('uploads'))
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))

// Define route
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/soal", soalRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
});

app.listen(PORT, () => {
	console.log(`listening to port ${PORT}`);
});
