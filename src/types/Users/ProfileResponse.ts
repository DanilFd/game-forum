export type ProfileResponse = {
    id: number
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
    comments_count: number
    blogs_count: number
    games_count: GamesCount

}
export type GamesCount = {
    favorite_games_count: number
    rated_games_count: number
}