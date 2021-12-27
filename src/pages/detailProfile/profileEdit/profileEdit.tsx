import styles from "./profileEdit.module.scss"
import {SubmitHandler, useForm} from "react-hook-form";
import usersStore from "../../../store/usersStore";
import {observer} from "mobx-react-lite";
import {motion} from "framer-motion"
import {toast} from "react-toastify";
import {FormLoader} from "../../../components/header/formLoader/formLoader";
import {useState} from "react";
import {Modal} from "../../../components/modal/modal";
import {ResetPasswordForm} from "./resetPasswordForm/resetPasswordFormType";

type editProfileForm = {
    birthday_date: string | null
    gender: 'Не указан' | 'Мужской' | 'Женский'
    discord: string | null
    about_custom_user: string | null
}

export const ProfileEdit = observer(() => {
    const [isPasswordEdit, setIsPasswordEdit] = useState(false)
    const {register, handleSubmit} = useForm<editProfileForm>({
        defaultValues: {
            birthday_date: usersStore.userProfile.birthday_date ?
                usersStore.userProfile.birthday_date :
                null,
            about_custom_user: usersStore.userProfile.about_custom_user ?
                usersStore.userProfile.about_custom_user :
                '',
            discord: usersStore.userProfile.discord ?
                usersStore.userProfile.discord :
                '',
            gender: usersStore.userProfile.gender ?
                usersStore.userProfile.gender :
                'Не указан'
        },
    });

    const onSubmit: SubmitHandler<editProfileForm> = data => {
        usersStore.profileEdit(data)
            .then(res => {
                toast.info('Данные успешно изменены.')
                usersStore.setAdditionalInfoInProfile(
                    res.data.gender,
                    res.data.about_custom_user,
                    res.data.birthday_date,
                    res.data.discord
                )
            })
            .catch(() => toast.error("При изменении данных произошла ошибка."))
    }
    return (
        <motion.div className={styles.profileEdit}
                    initial={{height: 0}}
                    animate={{height: "max-content"}}
                    exit={{height: 0}}
                    transition={{duration: 0.3}}
        >
            {
                usersStore.isLoadingEdit ?
                    <FormLoader/> :
                    <>
                        <div className={styles.formGroup}>
                            <div className={styles.formGroupLeft}>
                                <span className={styles.formGroupLeftTitle}>Отображаемое имя</span>
                                <span className={styles.formGroupLeftNote}>Под ним ты входишь на сайт.
                        Так же это имя видят остальные пользователи сайта.</span>
                            </div>
                            <div className={styles.formGroupRight}>
                                <span>{usersStore.userProfile.login}</span>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <div className={styles.formGroupLeft}>
                                <span className={styles.formGroupLeftTitle}>Почтовый ящик</span>
                                <span className={styles.formGroupLeftNote}>На него высылаются все данные.
                        В открытом виде не отображается.</span>
                            </div>
                            <div className={styles.formGroupRight}>
                                <span>{usersStore.userProfile.email}</span>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <div className={styles.formGroupLeft}>
                                <span className={styles.formGroupLeftTitle}>Пароль</span>
                            </div>
                            <div className={styles.formGroupRight}>
                                <button onClick={() => setIsPasswordEdit(prev => !prev)} className={styles.actionBtn}>
                                    <span>сменить пароль</span></button>
                            </div>
                        </div>
                        <Modal active={isPasswordEdit} setActive={setIsPasswordEdit}>
                            <ResetPasswordForm setIsPasswordEdit={setIsPasswordEdit}/>
                        </Modal>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.formGroup}>
                                <div className={styles.formGroupLeft}>
                                    <span className={styles.formGroupLeftTitle}>Дата рождения</span>
                                </div>
                                <div className={styles.formGroupRight}>
                                    <input {...register("birthday_date")} type="date"/>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <div className={styles.formGroupLeft}>
                                    <span className={styles.formGroupLeftTitle}>Пол</span>
                                </div>
                                <div className={styles.formGroupRight}>
                                    <select {...register("gender")}>
                                        <option value="Не указан">Не указан</option>
                                        <option value="Мужской">Мужской</option>
                                        <option value="Женский">Женский</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <div className={styles.formGroupLeft}>
                                    <span className={styles.formGroupLeftTitle}>Discord</span>
                                </div>
                                <div className={styles.formGroupRight}>
                                    <input {...register("discord")} type="text"/>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <div className={styles.formGroupLeft}>
                                    <span className={styles.formGroupLeftTitle}>Коротко о себе</span>
                                    <span className={styles.formGroupLeftNote}>информация будет отображаться на странице
                            твоего профиля.</span>
                                </div>
                                <div className={styles.formGroupRight}>
                                    <textarea {...register('about_custom_user')}/>
                                </div>
                            </div>
                            <div className={styles.formAction}>
                                <button className={styles.actionBtn} type="submit"><span>сохранить</span></button>
                                <button className={styles.resetBtn} type="reset">очистить</button>
                            </div>
                        </form>
                    </>
            }
        </motion.div>
    )
})
