export interface Message {
    id: string;
    author: string;
    message: string;
    dateTime: string;
}

export type MessageWithoutID = Omit<Message, "id">;