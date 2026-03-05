import database from "../database/config/connect";
import { CommentTable } from "../database/models/Comment";
import authMiddleware from "../middlewares/authMiddleware";
import { AuthenticatedRequest } from "../utils/types";
import { and, eq } from "drizzle-orm";
import { Router,Response } from "express";
import { basicCommentColumns } from "../utils/constants";
const router = Router();

router.use(authMiddleware);
router.get("/:id",async(req:AuthenticatedRequest,res:Response)=>{
    try {
        const {id} = req.params as {id:string};
        const comments = await database
            .query
            .CommentTable
            .findMany({
                where:and(eq(CommentTable.post,id),eq(CommentTable.author,req.user.id)),
                columns:basicCommentColumns,
            });
        res.status(200).json({comments});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post("/:id",async(req:AuthenticatedRequest,res:Response)=>{
    try {
        const {id} = req.params as {id:string};
        const {content} = req.body as {content:string};
        if(!content){
            return res.status(400).json({error:"Missing required fields"});
        }
        const comment = await database.insert(CommentTable).values({
            content,
            author:req.user.id,
            post:id
        }).returning({
            id:CommentTable.id,
            content:CommentTable.content,
            createdAt:CommentTable.createdAt,
            updatedAt:CommentTable.updatedAt,
        });
        res.status(201).json({comment});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.patch("/:id",async(req:AuthenticatedRequest,res:Response)=>{
    try {
        const {id} = req.params as {id:string};
        const {content} = req.body as {content:string};
        if(!content){
            return res.status(400).json({error:"Missing required fields"});
        }
        const comment = await database.update(CommentTable).set({
            content,
        }).where(and(eq(CommentTable.id,id),eq(CommentTable.author,req.user.id))).returning({
            id:CommentTable.id,
            content:CommentTable.content,
            createdAt:CommentTable.createdAt,
            updatedAt:CommentTable.updatedAt,
        });
        res.status(200).json({comment});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/:id",async(req:AuthenticatedRequest,res:Response)=>{
    try {
        const {id} = req.params as {id:string};
        const comment = await database.delete(CommentTable).where(and(eq(CommentTable.id,id),eq(CommentTable.author,req.user.id))).returning({
            id:CommentTable.id,
            content:CommentTable.content,
            createdAt:CommentTable.createdAt,
            updatedAt:CommentTable.updatedAt,
        });
        res.status(200).json({comment});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})





export default router;