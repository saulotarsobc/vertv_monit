import { NextFunction, Request, Response, Router } from "express";

const token = Router();

token.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.url, req.body);
    next();
});

export default token;