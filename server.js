import express from "express";
import cors from "cors";
import passport from 'passport';
import { jwtStrategy } from './src/common/jwt.strategy.js';
import EspacioRouter from "./src/controllers/espacioController.js";
import EdificioRouter from "./src/controllers/edificioController.js";
import DepartamentoRouter from "./src/controllers/departamentoController.js";
import AuthRouter from "./src/controllers/authController.js"
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const app = express();

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());
app.use("/espacios", EspacioRouter);
app.use("/auth", AuthRouter);
app.use("/edificios", EdificioRouter)
app.use("/departamentos", DepartamentoRouter)

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

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - body
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a post
 *         userId:
 *           type: integer
 *           description: id of author
 *         title:
 *           type: string
 *           description: title of post
 *         body:
 *           type: string
 *           descripton: content of post *
 *       example:
 *         id: 1
 *         userId: 1
 *         title: my title
 *         body: my article
 *
 */

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(process.env.PORT || 5000)

