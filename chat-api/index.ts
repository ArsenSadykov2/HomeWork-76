import express from "express";
import chatRouter from "./routes/chats";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/chat', chatRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})
