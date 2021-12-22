export const convertToTodayYesterday = (date: string) => {


    if (new Date().toLocaleDateString() === date) {
        return "Сегодня"
    }
    if (new Date(new Date().setDate(new Date().getDate() - 1))
        .toLocaleDateString() === date) {
        return "Вчера"
    }
    return date
}