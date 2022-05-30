import express from "express";
import cors from "cors";
import passport from 'passport';
import { jwtStrategy } from './src/common/jwt.strategy.js';
import EspacioRouter from "./src/controllers/espacioController.js";
import EdificioRouter from "./src/controllers/edificioController.js";
import AuthRouter from "./src/controllers/authController.js"

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/espacios", EspacioRouter);
app.use("/auth", AuthRouter);
app.use("/edificios", EdificioRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

