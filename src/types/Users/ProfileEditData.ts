export type ProfileEditData = {
    profile_img: FileList
    birthday_date: string | null
    gender: 'Не указан' | 'Мужской' | 'Женский'
    discord: string | null
    about_custom_user: string | null
}