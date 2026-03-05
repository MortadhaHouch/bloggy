import { Request, Response, Router } from "express";
import database from "../database/config/connect";
import { UserTable } from "../database/models/User";
import bcrypt from "bcrypt";
import { and, eq } from "drizzle-orm";
import { EMAIL_REGEX, MAX_JWT_EXPIRES_IN } from "../utils/constants";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { AuthenticatedRequest } from "../utils/types";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await database.query.UserTable.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/register", async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body as { firstName: string; lastName: string; email: string; password: string };
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        if(!EMAIL_REGEX.test(email)){
            return res.status(400).json({ error: "Invalid email" });
        }
        const foundUserByName = await database.query.UserTable.findFirst({where:and(eq(UserTable.firstName, firstName),eq(UserTable.lastName, lastName))});
        const foundUserByEmail = await database.select().from(UserTable).where(eq(UserTable.email, email));
        if (foundUserByName || foundUserByEmail) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await database.insert(UserTable).values({ 
            firstName, 
            lastName, 
            email, 
            password:hashedPassword,
            sessions:[req.ip as string]
         }).returning({
            id:UserTable.id,
         });
        const token = jwt.sign({
            email,
            id:user[0].id,
         }, process.env.JWT_SECRET as string, { expiresIn: MAX_JWT_EXPIRES_IN });
        res.status(201).json({user:user[0],token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/login",async(req:Request,res:Response)=>{
    try {
        const {email,password} = req.body as {email:string,password:string};
        if(!email || !password){
            return res.status(400).json({error:"Missing required fields"});
        }
        if(!EMAIL_REGEX.test(email)){
            return res.status(400).json({ error: "Invalid email" });
        }
        if(password.length<8){
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }
        const user = await database.query.UserTable.findFirst({where:eq(UserTable.email,email)});
        if(!user){
            return res.status(400).json({error:"User not found"});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({error:"Invalid password"});
        }
        const token = jwt.sign({
            email,
            id:user.id,
         }, process.env.JWT_SECRET as string, { expiresIn: MAX_JWT_EXPIRES_IN });
        user.sessions.push(req.ip as string);
        await database.update(UserTable).set({sessions:user.sessions}).where(eq(UserTable.email,email));
        res.status(200).json({user,token});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post("/logout",async(req:AuthenticatedRequest,res:Response)=>{
    try {
        const user = await database.query.UserTable.findFirst({where:eq(UserTable.email,req.user.email)});
        if(!user){
            return res.status(400).json({error:"User not found"});
        }
        user.sessions = user.sessions.filter((session) => session !== req.ip as string);
        await database.update(UserTable).set({sessions:user.sessions}).where(eq(UserTable.email,req.user.email));
        await database.update(UserTable).set({isLoggedIn:false}).where(eq(UserTable.email,req.user.email));
        res.status(200).json({message:"User logged out successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });   
    }
})

export default router;