import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import "dotenv/config";
import swaggerDocs from "./config/swagger";

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);
import userController from "./controllers/userController";
import commentController from "./controllers/commentController";
import postController from "./controllers/postController";
app.use(morgan("dev"))
app.use(cors({
    methods:["GET","POST","PUT","DELETE","PATCH"],
    origin:(process.env.ALLOWED_ORIGINS as string).split("|"),
    credentials:true,
}))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

// Routes
app.use("/api/user", userController);
app.use("/api/comment",commentController);
app.use("/api/post",postController);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    // Setup Swagger documentation
    swaggerDocs(app, PORT);
});