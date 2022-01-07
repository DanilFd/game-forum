import styles from "./messages.module.scss"
import {SideBar} from "../../components/sideBar/sideBar";
import {observer} from "mobx-react-lite";
import dialogsStore from "../../store/dialogsStore";
import Loader from "../../components/loader/loader";
import {useEffect} from "react";
import {Dialog} from "./dialog/dialog";
import {NavLink} from "react-router-dom";
import {useError} from "../../hooks/useError";

export const Messages = observer(() => {
        useEffect(() => {
            dialogsStore.fetchDialogs()
        }, [])
        useError(dialogsStore.error)
        return (
            <div className={styles.sidebarLayout}>
                <SideBar/>
                {
                    dialogsStore.isLoading ?
                        <Loader/> :
                        <main className={styles.content}>
                            <div className={styles.header}>
                                <h1>сообщения</h1>
                                <NavLink to="/pm/new"
                                         className={styles.createMessage}><span>создать сообщение</span></NavLink>
                            </div>
                            {dialogsStore.dialogs.map(dialog => <Dialog dialog={dialog}/>)}
                        </main>
                }
            </div>
        )
    }
)
