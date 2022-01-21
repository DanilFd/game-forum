type Voidify<T extends (...args: any) => any> = (...args: Parameters<T>) => void


export const throttle = <T extends (...args: any) => void>(action: T, time: number): Voidify<T> => {
    let isThrottle = false
    let savedArgs = null as null | Parameters<T>
    const wrapper = (...args: Parameters<T>) => {
        if (isThrottle) {
            savedArgs = args

            return
        }
        // @ts-ignore
        action(...args)
        isThrottle = true

        setTimeout(() => {
            isThrottle = false
            if (savedArgs) {
                wrapper(...savedArgs)
                savedArgs = null
            }
        }, time)
    }
    return wrapper
}
