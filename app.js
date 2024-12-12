var createError = require("http-errors");
require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

const http = require("http");
// specifying the desired port
const port = 4001;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var usersRouterSuperAdmin = require("./routes/super-admin/users");
var rolesRouterSuperAdmin = require("./routes/super-admin/roles");
var plansRouterSuperAdmin = require("./routes/super-admin/plans");
var superAdminRouter = require("./routes/super-admin/superAdminRoutes");
const { sequelize, checkDatabaseConnection } = require("./database/connection");

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   })
// );

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://annex-crm-fe.vercel.app",
  "https://ecrm.we4php.com",
]; // Add your frontend domains here

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Enable credentials if needed
};

// Use CORS middleware with options
app.use(cors(corsOptions));

app.use(
  "/api/uploads",
  express.static(path.join(__dirname, "public/my-uploads"))
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/super-admin/users", usersRouterSuperAdmin);
app.use("/api/super-admin/roles", rolesRouterSuperAdmin);
app.use("/api/super-admin/plans", plansRouterSuperAdmin);
app.use("/api/super-admin", superAdminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

checkDatabaseConnection();

module.exports = app;
