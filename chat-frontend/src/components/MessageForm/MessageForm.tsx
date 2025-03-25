import { FormEvent, ChangeEvent, useState } from 'react';
import { Message } from "../../types";

interface Props {
    send: (message: Message) => void;
}

const MessageForm: React.FC<Props> = ({ send }) => {
    const [message, setMessage] = useState<Message>({
        author: '',
        message: '',
    });
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessage(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        send(message);
        setMessage({ author: '', message: '' });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="author">Author</label>
                    <input
                        className="form-control"
                        type="text"
                        name="author"
                        value={message.author}
                        required
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                        className="form-control"
                        name="message"
                        value={message.message}
                        required
                        onChange={onChange}
                    />
                </div>
                <div>
                    <button className="btn btn-primary mt-3" type="submit">Click</button>
                </div>
            </form>
        </div>
    );
};

export default MessageForm;
