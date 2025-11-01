import express from "express";
import cors from "cors";

const app = express();

app.use(express.json())
app.use(cors({ credentials: true }));
// app.use(express.static("public"));


// routes
import adminRouter from "./routes/admin.route.js";
import blogRouter from "./routes/blog.route.js";

// route declaration
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);


export default app;