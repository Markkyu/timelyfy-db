const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Server Connected");
});

const loggerFunction = (req, res, next) => {
  console.log("API called at: " + new Date().toTimeString());
  console.log(`Request URL: ${req.originalUrl}`);

  next(); // run the next middleware or endpoint
};

// Middleware to check user roles
function requireRole(requiredRoles) {
  return (req, res, next) => {
    const userRole = req.user.role; // decoded from JWT or session
    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

// Do not put below the endpoints it will not use the connection
module.exports = connection; // Exports connection so routes/ can use the database

// LOGIN Router
const loginRouter = require("./routes/login");
app.use("/api/login", loginRouter);

// COLLEGE Router
const collegesRouter = require("./routes/colleges");
app.use("/api/colleges", loggerFunction, collegesRouter);

// ASSIGN COLLEGE Router
const assignCollegeRouters = require("./routes/assignColleges");
app.use("/api/assign-colleges", loggerFunction, assignCollegeRouters);

// COURSES Router
const courseRouter = require("./routes/courses");
app.use("/api/courses", loggerFunction, courseRouter);

// TEACHERS Router
const teacherRouter = require("./routes/teachers");
app.use("/api/teachers", loggerFunction, teacherRouter);

// TEACHERS in DEPARTMENT Router
const teacherDepartmentRouter = require("./routes/teachersDepartment");
app.use("/api/teachers/department/", loggerFunction, teacherDepartmentRouter);

// SCHEDULES Router
const scheduleRouter = require("./routes/schedules");
app.use("/api/schedules", loggerFunction, scheduleRouter);

// PHASE Router
const phaseRouter = require("./routes/phase");
app.use("/api/phase", loggerFunction, phaseRouter);

// USERS Router
const userRouter = require("./routes/users");
app.use("/api/users", loggerFunction, userRouter);

// App listening at port
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
