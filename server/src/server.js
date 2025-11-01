import connectDB from './config/db.js';
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config({
    path: './env'
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running at port : ${process.env.PORT}`);
        app.get('/', (req, res) => res.send("API Working."));
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed !!", err)
})