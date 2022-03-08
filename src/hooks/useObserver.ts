import {MutableRefObject, useEffect, useRef} from "react";

export const useObserver = (ref: MutableRefObject<null>, canLoad: boolean, isLoading: boolean, callback: () => void) => {
    const observer = useRef<IntersectionObserver | null>(null)
    useEffect(() => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        const cb: IntersectionObserverCallback = (entries) => {
            if (entries[0].isIntersecting && canLoad) {
                callback()
            }

        }
        observer.current = new IntersectionObserver(cb)
        observer.current.observe(ref.current!)
        // eslint-disable-next-line
    }, [isLoading])
}