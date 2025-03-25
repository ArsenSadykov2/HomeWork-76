import {Chat} from "../../types";
import React from "react";

interface Props {
    message: Chat;
}
const BackMessage: React.FC<Props> = ({message}) => {
    return (
        <div className="my-3 p-4 bg-light border rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="m-0">{message.author}</h5>
                <span className="text-muted fs-6">{message.datetime}</span>
            </div>
            <hr/>
            <p className="text-dark">{message.message}</p>
        </div>
    );
};

export default BackMessage;

