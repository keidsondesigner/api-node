import dotenv from 'dotenv';
dotenv.config();

import express  from "express";
import { PrismaClient } from "@prisma/client";
import { AuthMiddleware } from './middlewares/auth';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';

export const prisma  = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

const userController = new UserController();
const authController = new AuthController();

app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.post("/create", userController.store);
app.get("/users", AuthMiddleware, userController.index);
app.post("/auth", authController.authenticate);

app.get("/", async (req, res) => {
    res.send(
      `
    <h1>Users/Auth REST API</h1>
    <h2>Available Routes</h2>
    <pre>
      POST /create
      POST /atuh
      GET /users
    </pre>
    `.trim(),
    );
  });

app.listen(Number(port), "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});