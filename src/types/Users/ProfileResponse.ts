export type ProfileResponse = {
    profile_img: string
    login: string
    date_joined: string
    last_visit: string
    birthday_date: null | string
    discord: null | string
    gender: 'Не указан' | 'Мужской' | 'Женский'
    about_custom_user: null | string
    rate: "Like" | "Dislike" | null
    rating: number
    age: null | string
    email: string
}