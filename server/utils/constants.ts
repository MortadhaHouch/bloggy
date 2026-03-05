import "dotenv/config"
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MAX_JWT_EXPIRES_IN = process.env.MAX_JWT_SESSION as unknown as number;
export const basicPostColumns = {
    id:true,
    title:true,
    content:true,
    createdAt:true,
    updatedAt:true,
    tags:true,
}
export const basicCommentColumns = {
    id:true,
    content:true,
    createdAt:true,
    updatedAt:true,
    // author:true,
    // post:true,
}