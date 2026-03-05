import { PostReactionTable } from "../database/models";
import database from "../database/config/connect";
import { PostTable } from "../database/models/Post";
import authMiddleware from "../middlewares/authMiddleware";
import { AuthenticatedRequest, ReactionType } from "../utils/types";
import { and, eq,like } from "drizzle-orm";
import { Response, Router } from "express";
import { basicPostColumns } from "../utils/constants";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { p } = req.query as { p?: string };
        const posts = await database.query.PostTable.findMany({
            where: eq(PostTable.author, req.user.id),
            limit: 10,
            offset: (Number(p) - 1) * 10,
            columns:basicPostColumns,
        });
        return res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id", async (req: AuthenticatedRequest, res: Response) => {
    try {
        const {id} = req.params as {id:string};
        const post = await database.query.PostTable.findFirst({where:and(eq(PostTable.id, id),eq(PostTable.author, req.user.id))});
        if(!post){
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json({ post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/tags/:tags",async(req:AuthenticatedRequest,res:Response)=>{
    try {
        const {tags} = req.params as {tags:string};
        const {p} = req.query as {p?:string};
        const posts = await database
            .query
            .PostTable
            .findMany({
                where:and(eq(PostTable.author, req.user.id),like(PostTable.tags, `%${tags}%`)),
                limit:10,
                offset:(Number(p)-1)*10,
                columns:basicPostColumns,
            })
        return res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { title, content } = req.body as { title: string; content: string };
        if (!title || !content) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const post = await database.insert(PostTable).values({
            title,
            content,
            author: req.user.id,
        }).returning({
            id:PostTable.id,
            content:PostTable.content,
            title:PostTable.title,
            createdAt:PostTable.createdAt,
            updatedAt:PostTable.updatedAt,
            tags:PostTable.tags,
        });
        return res.status(201).json({ post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:id", async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { title, content } = req.body as { title?: string; content?: string };
        if (!title || !content) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const post = await database.update(PostTable).set({
            title,
            content,
        }).where(and(eq(PostTable.id, req.params.id),eq(PostTable.author, req.user.id))).returning({
            id:PostTable.id,
            content:PostTable.content,
            title:PostTable.title,
            createdAt:PostTable.createdAt,
            updatedAt:PostTable.updatedAt,
            tags:PostTable.tags,
        });
        return res.status(200).json({ post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.patch("/toggle-like/:reactId/:id", async (req: AuthenticatedRequest, res: Response) => {
    try {
        const {reactId,id} = req.params as {reactId:string,id:string};
        const {reaction}  = req.body as {reaction:ReactionType};
        const editedReaction = await database.update(PostReactionTable).set({
            reaction,
        }).where(and(eq(PostReactionTable.id, reactId),eq(PostReactionTable.post, id),eq(PostReactionTable.author, req.user.id))).returning({
            id:PostReactionTable.id,
            reaction:PostReactionTable.reaction,
        });
        return res.status(200).json({ reaction:editedReaction });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:id", async (req: AuthenticatedRequest, res: Response) => {
    try {
        const post = await database.delete(PostTable).where(and(eq(PostTable.id, req.params.id),eq(PostTable.author, req.user.id))).returning({
            id:PostTable.id
        });
        return res.status(200).json({ post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});





export default router