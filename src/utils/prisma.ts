import dotenv from 'dotenv';
dotenv.config();

// console.log('DATABASE_URL:', process.env.DATABASE_URL); // Debugging database URL

import { PrismaClient } from "@prisma/client";

export const prisma  = new PrismaClient();