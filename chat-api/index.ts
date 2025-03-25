import express from "express";
import chatRouter from "./routes/chats";
import fileDb from "./fileDb";


const app = express();
const port = 8000;

app.use(express.json());
app.use('/messages', chatRouter);

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    })
};

run().catch(console.error);

