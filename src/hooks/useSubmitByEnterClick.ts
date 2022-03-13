import {MutableRefObject, useEffect} from "react";


export const useSubmitByEnterClick = (buttonRef: MutableRefObject<HTMLElement | null>, needToDo: boolean = true) => {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!e.shiftKey && e.key === 'Enter') {
                e.preventDefault()
                buttonRef.current?.click()
            }
        }
        if (needToDo) {
            document.addEventListener('keydown', onKeyDown)
        }
        return () => document.removeEventListener('keydown', onKeyDown)
        // eslint-disable-next-line
    }, [])
}