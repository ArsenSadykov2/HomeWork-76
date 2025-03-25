import { promises as fs } from "fs";
import { existsSync } from "node:fs";
import { Message, MessageWithoutID } from "./types";
import * as crypto from "node:crypto";

const filename = "./messages.json";
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            if (!existsSync(filename)) {
                await fs.writeFile(filename, JSON.stringify([]));
            } else {
                const fileContent = await fs.readFile(filename);
                data = JSON.parse(fileContent.toString()) as Message[];
            }
        } catch (e) {
            data = [];
            console.error(e);
        }
    },

    async getAllMessages(): Promise<Message[]> {
        return data;
    },

    async addNewMessage(message: MessageWithoutID) {
        const newMessage = { id: crypto.randomUUID().toString(), ...message };
        data.push(newMessage);
        await this.save();
        return newMessage;
    },

    async save() {
        return fs.writeFile(filename, JSON.stringify(data));
    },
};

export default fileDb;