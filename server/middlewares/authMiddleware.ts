import {Request,Response,NextFunction} from "express"
import "dotenv/config"
import jwt from "jsonwebtoken"
import { AuthenticatedRequest, Token } from "../utils/types"
import database from "../database/config/connect"
import { UserTable } from "../database/models/User"
import { and, eq } from "drizzle-orm"
export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers["authorization"]
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message:"Unauthorized"})
        }
        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as Token;
        if(!decoded){
            return res.status(401).json({message:"Unauthorized"})
        }
        const users = await database.select().from(UserTable).where(and(eq(UserTable.id, decoded.id),eq(UserTable.email, decoded.email)));
        if(!users.length){
            return res.status(401).json({message:"Unauthorized"})
        }
        (req as AuthenticatedRequest).user = users[0];
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Unauthorized"})
    }
}