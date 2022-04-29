
type Voidify<T extends (...args: any) => any> = (...args: Parameters<T>) => void

export const debounce = <T extends (...args: any) => void>(fn: T, time: number): Voidify<T> => {
    let timeout: any;
    return (...args: Parameters<T>) => {
        // @ts-ignore
        const fnCall = () => fn(...args)
        clearTimeout(timeout)
        timeout = setTimeout(fnCall, time)

    }
}