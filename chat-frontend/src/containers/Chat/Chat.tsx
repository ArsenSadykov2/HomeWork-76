import {useCallback, useEffect, useState} from "react";
import {Chat, Message} from "../../types";
import MessageForm from "../../components/MessageForm/MessageForm.tsx"
import axios from "axios";
import BackMessage from "../../components/BackMessage/BackMessage.tsx";

const Chat = () => {
    const baseUrl = 'http://146.185.154.90:8000/messages';
    const [message, setMessage] = useState<Chat[]>([]);
    const [date, setDate] = useState<null | string>(null);

    const send = async (message: Message) => {
        try {
            await axios.post(baseUrl, new URLSearchParams({...message}));
        } catch (e){
            console.error(e);
        }
    }

    const catchMessage = useCallback(async (dateTime: string) => {

        const url = () => {
            if (dateTime) {
                return baseUrl + "?dateTime=" + dateTime;
            } else {
                return baseUrl;
            }
        };

        try {
            const response = await axios.get(url());
            setMessage((prevState) => [...response.data, ...prevState]);
        } catch (error) {
            console.error("Ошибка при запросе:", error);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            void catchMessage(setDate);
        }, 4000);
        return () => clearInterval(interval);
    }, [catchMessage, date]);

    return (
        <div className="container py-4">
            <MessageForm send={send}/>
            <hr/>
            <div className="message-list">
                {message.map((msg) => (
                    <BackMessage key={msg.id} message={msg}/>
                ))}
            </div>
        </div>

    );
};

export default Chat;