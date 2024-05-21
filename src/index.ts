import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from "@prisma/client";
import express  from "express";
import { router } from "./routes";

export const prisma  = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(Number(port), "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});