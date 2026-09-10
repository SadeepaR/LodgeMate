import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Hello from Express",
        timestamp: new Date().toISOString(),
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});