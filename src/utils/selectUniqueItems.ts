

export const selectUniqueItems = <T>(data: T[]) => {
    return data.filter((item, i, ar) => ar.indexOf(item) === i)

}
