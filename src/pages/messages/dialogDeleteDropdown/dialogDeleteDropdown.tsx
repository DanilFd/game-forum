import styles from "./dialogDeleteDropdown.module.scss"
import {BsThreeDots} from "react-icons/all";
import {useState} from "react";
import dialogsStore from "../../../store/dialogsStore";
import {useHistory} from "react-router-dom";


type Props = {
    dialogId: number
}

export const DialogDeleteDropdown = ({dialogId}: Props) => {
    const history = useHistory()
    const [active, setActive] = useState(false)
    const dialogDelete = () => {
        dialogsStore.dialogDelete(dialogId)
            .then(() => {
                history.push('/pm')
                dialogsStore.fetchDialogs()
            })
    }
    return (
        <div className={styles.wrapper} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
            <BsThreeDots
                className={styles.icon}/>
            <div className={`${styles.dropdown} ${active ? styles.active : ''}`}>
                <span onClick={dialogDelete}>удалить переписку</span>
            </div>
        </div>
    );
};

