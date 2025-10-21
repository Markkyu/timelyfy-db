const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Import custom middlewares
const loggerFunction = require("./middleware/logger");

// Import routes
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const collegesRouter = require("./routes/colleges");
const assignCollegeRouters = require("./routes/assignColleges");
const courseRouter = require("./routes/courses");
const teacherRouter = require("./routes/teachers");
const teacherDepartmentRouter = require("./routes/teachersDepartment");
const scheduleRouter = require("./routes/schedules");
const phaseRouter = require("./routes/phase");
const userRouter = require("./routes/users");
const roomRouter = require("./routes/rooms");
const testRouter = require("./routes/test");

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Hello from Timelyfy" });
});

// Use routers
app.use("/api/login", loggerFunction, loginRouter);
app.use("/api/register", loggerFunction, registerRouter);
app.use("/api/colleges", loggerFunction, collegesRouter);
app.use("/api/assign-colleges", loggerFunction, assignCollegeRouters);
app.use("/api/courses", loggerFunction, courseRouter);
app.use("/api/teachers", loggerFunction, teacherRouter);
app.use("/api/teachers/department", loggerFunction, teacherDepartmentRouter);
app.use("/api/schedules", loggerFunction, scheduleRouter);
app.use("/api/phase", loggerFunction, phaseRouter);
app.use("/api/users", loggerFunction, userRouter);
app.use("/api/rooms", loggerFunction, roomRouter);
app.use("/api/test", testRouter);

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
