import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    user: Token;
}

declare global {
    namespace Express {
        interface Request {
            user: Token;
        }
    }
}
export type Token = {
    id: string;
    email: string;
};
export type ReactionType = "like"|"dislike"|"love"|"haha"|"wow"|"sad"|"angry"|"care"|"support"|"confused"