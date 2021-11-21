export const convertToTodayYesterday = (item: { creation_date: string }) => {


    if (new Date().toLocaleDateString() === item.creation_date) {
        item.creation_date = "Сегодня"
    } else if (new Date(new Date().setDate(new Date().getDate() - 1))
        .toLocaleDateString() === item.creation_date) {
        item.creation_date = "Вчера"
    }
}