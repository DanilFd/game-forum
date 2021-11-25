export const range = (from: number, to: number, step = 1) => {
    const result = []

    for(let i = from; i < to;i+=step){
        result.push(i)
    }
    return result
}
