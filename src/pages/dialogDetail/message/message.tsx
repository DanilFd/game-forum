import React from 'react';
import {Message as MessageType} from "../../../types/Dialogs/Message";
import styles from "./message.module.scss"
import {CompactProfile} from "../../../components/compactProfile/compactProfile";
import {DialogDeleteDropdown} from "../../messages/dialogDeleteDropdown/dialogDeleteDropdown";

type Props = {
    message: MessageType
    dialogId: number
}


const Message = ({message, dialogId}: Props) => {
    return (
        <div className={styles.message}>
            <div className={styles.info}>
                <CompactProfile user={message.sender}/>
                <span className={styles.sendingDate}>{message.sending_date}</span>
                {message.is_first && <DialogDeleteDropdown dialogId={dialogId}/>}
            </div>
            <p className={styles.content}>{message.content}</p>
        </div>
    );
};

export default Message;