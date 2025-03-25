import express, { Request, Response, Router } from 'express';
import fileDb from '../fileDb';
import { MessageWithoutID } from '../types';

const chatRouter: Router = express.Router();

chatRouter.get('/', async (req, res) => {
    try {
        const messages = await fileDb.getAllMessages();
        const datetime = req.query.datetime;

        if (datetime) {
            const date = new Date(datetime);
            if (isNaN(date.getTime())) {
                return res.status(400).json({ error: 'Wrong datetime format' });
            }

            const filteredMessages = messages.filter(
                (msg) => new Date(msg.dateTime) > date
            );
            return res.json(filteredMessages);
        }

        const lastMessages = messages.slice(-30).reverse();
        return res.json(lastMessages);
    } catch (e) {
        console.error(e);
    }
});

chatRouter.post('/', async (req, res) => {
    try {
        const { author, message } = req.body;

        if (!author?.trim() || !message?.trim()) {
            return res.status(400).json({ error: 'Author and message must be present in the request' });
        }

        const newMessage: MessageWithoutID = {
            author: author.trim(),
            message: message.trim(),
            dateTime: new Date().toISOString(),
        };

        const savedMessage = await fileDb.addNewMessage(newMessage);
        return res.json(savedMessage);
    } catch (e) {
        console.error(e);
    }
});

export default chatRouter;