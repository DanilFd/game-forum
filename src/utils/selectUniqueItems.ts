

export const selectUniqueItems = (data: any[]) => {
    return data.filter((item, i, ar) => ar.indexOf(item) === i)

}
