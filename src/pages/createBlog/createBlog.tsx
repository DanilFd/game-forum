import styles from "./createBlog.module.scss"
import {SideBar} from "../news/sideBar/sideBar";
import {blogsCategories} from "../../utils/blogsCategories";
import RichTextEditor from "./richTextEditor/richTextEditor";
import {Controller, FieldError, SubmitHandler, useForm} from "react-hook-form";
import {EditorData} from "../../types/Blogs/EditorData";
import {observer} from "mobx-react-lite";
import blogStore from "../../store/blogStore";
import {toast} from "react-toastify";
import {AiOutlineUpload} from "react-icons/all";
import {AxiosError} from "axios";
import {useState} from "react";
// @ts-ignore
import edjsHTML from "editorjs-html"

type blogForm = {
    header: string
    content: EditorData
    blogCover: FileList
}

export const CreateBlog = observer(() => {
    const {register, setError, formState: {errors}, handleSubmit, control, watch, reset} = useForm<blogForm>({
        mode: "onSubmit"
    });
    const [isClearEditor, setIsClearEditor] = useState(false)
    const onSubmit: SubmitHandler<blogForm> = data => {
        if (!data.content.blocks.length)
            return setError('content', {
                type: "required",
                message: "Контент не указан."
            })
        const edjsParser = edjsHTML();
        const html = edjsParser.parse(data.content).join('');
        const formData = new FormData()
        formData.append('img', data.blogCover[0])
        formData.append('title', data.header)
        formData.append('content', html)
        blogStore.createBlog(formData)
            .then(() => toast.success('Ваш блог успешно создан.'))
            .catch((err: AxiosError<{ title?: string[] }>) => toast.error(err.response?.data.title?.[0].replace('Название', 'названием')
                || 'При создании блога произошла непредвиденная ошибка.'))
    }
    const blogCover = watch('blogCover')
    return (
        <div className={styles.createBlog}>
            <SideBar isNews={false} categories={blogsCategories} url="blogs" showAllNewsLink={false}/>
            <section className={styles.content}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.editorWrapper}>
                        <textarea onKeyPress={e => {
                            if (e.key === 'Enter')
                                e.preventDefault()
                        }} placeholder="Название темы" {...register('header', {
                            required: "Заголовок не указан.",
                            minLength: {value: 5, message: "Минимальная длинна заголовка 5 символов."},
                            maxLength: {value: 100, message: "Максимальная длинна заголовка 100 символов."}
                        })}
                                  className={styles.blogTitle}/>
                        <Controller
                            rules={{required: "Контент не указан."}}
                            control={control}
                            name="content"
                            render={({field: {onChange, value}}) => (
                                <RichTextEditor setIsClearEditor={setIsClearEditor} isClearEditor={isClearEditor}
                                                value={value} onChange={onChange}/>
                            )}
                        />
                    </div>
                    <label>
                        <div className={styles.uploadFileForm}>
                            <AiOutlineUpload/>
                            {
                                blogCover?.length ? <span>{blogCover[0]?.name}</span> :
                                    <span>Загрузить обложку</span>
                            }
                        </div>
                        <input hidden accept="image/*" {...register('blogCover', {
                            required: 'Обложка не выбрана.'
                        })} type="file"/>
                    </label>
                    <p className={styles.formNote}>Рекомендуемый минимальный размер 1280×720 пикселей</p>
                    {
                        !!Object.keys(errors).length &&
                        <div className={styles.errorsWrapper}>
                            <span className={styles.errorTitle}>Перед публикацией исправьте следующие ошибки:</span>
                            {errors.header && <span className={styles.error}>{errors.header.message}</span>}
                            {errors.content &&
                            <span className={styles.error}>{(errors.content as FieldError).message}</span>}
                            {errors.blogCover && <span className={styles.error}>{errors.blogCover.message}</span>}
                        </div>
                    }
                    <div className={styles.formAction}>
                        <button className={styles.actionBtn} type="submit">
                            <span>опубликовать</span></button>
                        <button onClick={() => {
                            setIsClearEditor(true)
                            reset()
                        }} type="button" className={styles.draftBtn}><span>очистить</span>
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
});

