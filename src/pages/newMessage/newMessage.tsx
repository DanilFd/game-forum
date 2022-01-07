import {SideBar} from "../../components/sideBar/sideBar";
import styles from "./newMessage.module.scss"
import {useForm} from "react-hook-form";

type NewMessageForm = {
    addressee: string
    title: string
    content: string
}

export const NewMessage = () => {
    const {register, handleSubmit} = useForm<NewMessageForm>();
    const onSubmit = () => {

    }
    return (
        <div className={styles.sidebarLayout}>
            <SideBar/>
            <main className={styles.content}>
                <div className={styles.header}>
                    <h1>сообщения</h1>
                </div>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <input className={styles.half} {...register('addressee')} placeholder="Кому" type="text"/>
                        <span className={styles.formNote}>укажите имя пользователя, работает автоподстановка</span>
                    </div>
                    <div className={styles.formGroup}>
                        <input {...register('title')} placeholder="Заголовок" type="text"/>
                        <span className={styles.formNote}>заголовок диалога</span>
                    </div>

                    <div className={styles.formGroup}>
                        <textarea {...register('content')} />
                        <span className={styles.formNote}>сообщение</span>
                    </div>

                    <button className={styles.actionBtn} type="submit"><span>отправить</span></button>
                </form>
            </main>

        </div>
    )
}
