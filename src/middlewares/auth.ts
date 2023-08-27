import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
}

export function AuthMiddleware(req: Request, res: Response, next: NextFunction ) {

    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({error: "Token not provided"});
    }

    const [, token] = authorization.split(" ");
    console.log(token);

    try {
        const decoded = verify(token, "JWT_SECRET");
        const { id } = decoded as TokenPayload;

        req.userId = id;
        next();

    } catch (error) {
        console.log(error);
        return res.status(498).json({error: "Token invalid"});
    }
}