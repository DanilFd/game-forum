import {NavLink} from "react-router-dom"
import styles from "./dialog.module.scss"
import {Dialog as DialogType} from "../../../types/Dialogs/Dialog";
import {FaRegCommentAlt} from "react-icons/all";
import {CompactProfile} from "../../../components/compactProfile/compactProfile";
import {DialogDeleteDropdown} from "../dialogDeleteDropdown/dialogDeleteDropdown";

type Props = {
    dialog: DialogType
}


export const Dialog = ({dialog}: Props) => {
    return (
        <div className={styles.item}>
            <NavLink className={styles.title} to={`/pm/read/${dialog.id}`}>
                {dialog.title}
            </NavLink>
            <div className={styles.info}>
                <div>
                    <CompactProfile user={dialog.interlocutor}/>
                </div>
                <div className={styles.creationDate}>
                    <span>{dialog.creation_date}</span>
                </div>
                <div className={styles.messagesCount}>
                    <FaRegCommentAlt/>
                    <span>{dialog.messages_count}</span>
                </div>
                <DialogDeleteDropdown dialogId={dialog.id}/>
            </div>
            <div className={styles.lastMessage}>
                {dialog.last_message.is_me && <b>Вы:</b>}
                <span>{dialog.last_message.content}</span>
            </div>
        </div>
    )
}
