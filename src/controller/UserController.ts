import { Request, Response } from "express";
import { prisma } from "../index";
import { hash } from "bcryptjs";


export class UserController {
    async index(req: Request, res: Response){
        const users = await prisma.user.findMany();
        return res.json({ users });
    };

    async store(req: Request, res: Response){
        const { name, email, password } = req.body;

        const userExists = await prisma.user.findUnique({ where: { email }});

        if(userExists) {
            return res.status(409).json({ error: "User exists"});
        }

        const hash_password = await hash(password, 8);

        const user = await prisma.user.create({ 
            data: { 
                name, 
                email, 
                password: hash_password,
            }
        });
        return res.status(201).json({ user });
    };
};