import express from "express";

const chatRouter = express.Router();

chatRouter.get('/', (req, res) => {
    res.send("Получен весь список сообщений");
});

chatRouter.post('/', (req, res) => {
    res.send("Создали новое сообщений");
});

export default chatRouter;