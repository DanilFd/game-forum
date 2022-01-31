import React, {useEffect, useRef} from 'react';
import styles from "./dialogDetail.module.scss"
import {SideBar} from "../../components/sideBar/sideBar";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import dialogsStore from "../../store/dialogsStore";
import Message from "./message/message";
import Loader from "../../components/loader/loader";
import {SubmitHandler, useForm} from "react-hook-form";
import {FormLoader} from "../../components/header/formLoader/formLoader";
import {useSubmitByEnterClick} from "../../hooks/useSubmitByEnterClick";
import {useError} from "../../hooks/useError";
import {toast} from "react-toastify";

type DialogDetailForm = {
    message: string
}

export const DialogDetail = observer(() => {
        const {register, handleSubmit, formState: {errors}, setValue} = useForm<DialogDetailForm>();
        const params = useParams<{ dialogId: string }>()
        const buttonRef = useRef<null | HTMLButtonElement>(null)
        useEffect(() => {
            dialogsStore.getDialogMessages(+params.dialogId)
        }, [params.dialogId])
        const onSubmit: SubmitHandler<DialogDetailForm> = data => {
            const response = {dialog: +params.dialogId, content: data.message}
            dialogsStore.sendMessage(response)
                .then(() => setValue('message', ''))
                .catch(() => toast.error('Упс, произошла непредвидденая ошибка.'))
        }
        useSubmitByEnterClick(buttonRef)
        useError(dialogsStore.error)
        return (
            <div className={styles.sidebarLayout}>
                <SideBar/>
                {
                    dialogsStore.isLoadingDialogDetail ?
                        <Loader/> :
                        <div className={styles.content}>
                            <h1 className={styles.dialogTitle}>{dialogsStore.dialogDetail?.title}</h1>
                            <section className={styles.messages}>
                                {
                                    dialogsStore.dialogDetail?.messages.map(message =>
                                        <Message key={message.id} dialogId={+params.dialogId} message={message}/>)
                                }
                            </section>
                            {
                                !dialogsStore.dialogDetail?.user_that_deleted ?
                                    <>

                                        {
                                            dialogsStore.isSendingMessage ?
                                                <FormLoader/> :
                                                <form onSubmit={handleSubmit(onSubmit)} className={styles.sendingMessage}>
                                                <textarea {...register('message',
                                                    {required: "Сообщение не должно быть пустым."})}
                                                          name="message"/>
                                                    {errors.message &&
                                                    <span className={styles.error}>{errors.message.message}</span>}
                                                    <button ref={buttonRef} type="submit"><span>ответить</span></button>
                                                </form>
                                        }
                                    </> :
                                    <div className={styles.errorMessage}>
                                        <span>Ответит не возможно, т.к. получаемая сторона удалила эту ветку.</span>
                                    </div>
                            }
                        </div>
                }
            </div>
        );
    }
);

