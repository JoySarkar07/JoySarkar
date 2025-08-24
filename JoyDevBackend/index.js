require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require("./database/connection");
const projectRouter = require("./v1/routes/projectRoute");
const reviewRoute = require("./v1/routes/reviewRoute");
const experienceRoute = require("./v1/routes/experienceRouter");
const matrixRouter = require("./v1/routes/matrixRouter");
const skillsRouter = require("./v1/routes/skillRoute");
const emailRouter = require("./v1/routes/emailRouter");
const userRouter = require("./v1/routes/userRouter");


const app = express()
const port = 3000

app.use(express.json());
app.use(cors({origin: process.env.ORIGIN}));

const v1Router = express.Router();

v1Router.use("/user", userRouter);
v1Router.use("/email", emailRouter);
v1Router.use("/project", projectRouter);
v1Router.use("/skill", skillsRouter);
v1Router.use("/matrix", matrixRouter);
v1Router.use("/review", reviewRoute);
v1Router.use("/experience", experienceRoute);

app.use("/api/v1", v1Router);

try{
  connection();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}catch(e){
  console.error("Server Failed .");
}