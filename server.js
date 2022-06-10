import express from "express";
import cors from "cors";
import passport from 'passport';
import { jwtStrategy } from './src/common/jwt.strategy.js';
import EspacioRouter from "./src/controllers/espacioController.js";
import EdificioRouter from "./src/controllers/edificioController.js";
import DepartamentoRouter from "./src/controllers/departamentoController.js";
import AuthRouter from "./src/controllers/authController.js"

//import AdminRouter from "./src/controllers/adminController.js"

const app = express();
//const path = require("path")
//const swaggerUI = require("swagger-ui-express");
//const swaggerJsDoc = require("swagger-jsdoc");
//const swaggerSpec = {
  //definition: {
    //openapi: "3.0.0",
    //info:{
      //tittle: "api miedificio",
      //version: "1.0.0"
    //},
    //servers: [
     // {
      //url: "http://localhost:5000"
      //}
    //]
  //},
  //apis:['${path.join(__dirname,"./controllers/*.js)}'],
//}

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());
//app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
app.use("/espacios", EspacioRouter);
app.use("/auth", AuthRouter);
app.use("/edificios", EdificioRouter)
app.use("/departamentos", DepartamentoRouter)
//app.use("/admins", AdminRouter)


app.listen(process.env.PORT || 5000)

