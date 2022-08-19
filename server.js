import express from "express";
import cors from "cors";
import passport from 'passport';
import { jwtStrategy } from './src/common/jwt.strategy.js';
import EspacioRouter from "./src/controllers/espacioController.js";
import EdificioRouter from "./src/controllers/edificioController.js";
import DepartamentoRouter from "./src/controllers/departamentoController.js";
import AdministradorRouter from "./src/controllers/administradorController.js";
import EventoRouter from "./src/controllers/eventoController.js";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const app = express();

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());
app.use("/espacios", EspacioRouter);
app.use("/edificios", EdificioRouter)
app.use("/departamentos", DepartamentoRouter)
app.use("/administradores", AdministradorRouter)
app.use("/eventos", EventoRouter)

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "My API Documentation",
      },
    ],
  },
  apis: ["./src/controllers/*.js"],
};


const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(process.env.PORT || 4000)

