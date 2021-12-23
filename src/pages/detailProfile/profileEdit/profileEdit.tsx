import styles from "./profileEdit.module.scss"
import {SubmitHandler, useForm} from "react-hook-form";

type editProfileForm = {
    birthdayDate: string
    gender: 'Не указан' | 'Мужской' | 'Женский'
    discord: string
    aboutUser: string
}

export const ProfileEdit = () => {
    const {register, formState: {errors}, handleSubmit} = useForm<editProfileForm>();
    const onSubmit: SubmitHandler<editProfileForm> = data => {

    }
    return (
        <div className={styles.profileEdit}>
            <div className={styles.formGroup}>
                <div className={styles.formGroupLeft}>
                    <span className={styles.formGroupLeftTitle}>Отображаемое имя</span>
                    <span className={styles.formGroupLeftNote}>Под ним ты входишь на сайт.
                        Так же это имя видят остальные пользователи сайта.</span>
                </div>
                <div className={styles.formGroupRight}>
                    <span>ZentoriiuM123</span>
                </div>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.formGroupLeft}>
                    <span className={styles.formGroupLeftTitle}>Почтовый ящик</span>
                    <span className={styles.formGroupLeftNote}>На него высылаются все данные.
                        В открытом виде не отображается.</span>
                </div>
                <div className={styles.formGroupRight}>
                    <span>happyaggresor@mail.ru</span>
                </div>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.formGroupLeft}>
                    <span className={styles.formGroupLeftTitle}>Пароль</span>
                </div>
                <div className={styles.formGroupRight}>
                    <button className={styles.actionBtn}><span>сменить пароль</span></button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <div className={styles.formGroupLeft}>
                        <span className={styles.formGroupLeftTitle}>Дата рождения</span>
                    </div>
                    <div className={styles.formGroupRight}>
                        <input {...register("birthdayDate")} type="date"/>
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
                        <textarea {...register('aboutUser')}/>
                    </div>
                </div>
                <div className={styles.formAction}>
                    <button className={styles.actionBtn} type="submit"><span>сохранить</span></button>
                    <button className={styles.resetBtn} type="reset">очистить</button>
                </div>
            </form>
        </div>
    )
}
