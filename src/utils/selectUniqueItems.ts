

export const selectUniqueItems = <T>(data: T[]) => {
    return [...new Set(data)]

}
