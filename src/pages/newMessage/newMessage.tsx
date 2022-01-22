import {SideBar} from "../../components/sideBar/sideBar";
import styles from "./newMessage.module.scss"
import {SubmitHandler, useForm} from "react-hook-form";
import dialogsStore from "../../store/dialogsStore";
import {AxiosError} from "axios";
import {toast} from "react-toastify";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import usersStore from "../../store/usersStore";
import {throttle} from "../../utils/throttle";
import {ListOfFoundUsers} from "./listOfFoundUsers/listOfFoundUsers";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";


type NewMessageForm = {
    responder: string
    title: string
    content: string
}

export const NewMessage = observer(() => {
    const history = useHistory()
    const [active, setActive] = useState(false)
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<NewMessageForm>({
        mode: "onChange"
    });
    useEffect(() => {
        const removeUserList = () => setActive(false)
        document.addEventListener('click', removeUserList)
        return () => document.removeEventListener('click', removeUserList)
    }, [])
    const onSubmit: SubmitHandler<NewMessageForm> = data => {
        dialogsStore.createDialog(data)
            .then(() => history.push('/pm'))
            .catch((errors: AxiosError<{ detail: string }>) => toast.error(errors.response?.data.detail))
    }
    // eslint-disable-next-line
    const throttled = useCallback(throttle(newValue => usersStore.usersSearch(newValue), 1000), []);
    return (
        <div className={styles.sidebarLayout}>
            <SideBar/>
            <main className={styles.content}>
                <div className={styles.header}>
                    <h1>сообщения</h1>
                </div>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={`${styles.formGroup} ${styles.withModal}`}>
                        <input autoComplete="off" onFocus={() => setActive(true)} onClick={e => e.stopPropagation()}
                               className={styles.half} {...register('responder', {
                            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value.length > 0 &&
                                throttled(e.target.value)
                                setActive(true)
                            },
                            required: 'Это обязательное поле'
                        })} placeholder="Кому" type="text"/>
                        {errors.responder ?
                            <span className={styles.formError}>{errors.responder.message}</span> :
                            <span className={styles.formNote}>укажите имя пользователя, работает автоподстановка</span>}
                        <ListOfFoundUsers foundUsers={usersStore.foundUsers}
                                          setUser={(login) => setValue('responder', login)} active={active}/>
                    </div>
                    <div className={styles.formGroup}>
                        <input {...register('title', {
                            required: 'Это обязательное поле',
                            maxLength: {value: 50, message: 'Максимальная длинна заголовка 50 символов'}
                        })} placeholder="Заголовок" type="text"/>
                        {errors.title ?
                            <span className={styles.formError}>{errors.title.message}</span> :
                            <span className={styles.formNote}>заголовок диалога</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <textarea {...register('content', {
                            required: 'Это обязательное поле'
                        })} />
                        {errors.content ?
                            <span className={styles.formError}>{errors.content.message}</span> :
                            <span className={styles.formNote}>сообщение</span>}
                    </div>
                    <button className={styles.actionBtn} type="submit"><span>отправить</span></button>
                </form>
            </main>

        </div>
    )
})
