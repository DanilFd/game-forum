import styles from './modal.module.scss'
import {FC} from "react";

type Props = {
    active: boolean,
    setActive: (active: boolean) => void
}

export const Modal: FC<Props> = ({active, setActive, children}) => {
    return (
        <div className={active ? `${styles.modal} ${styles.active}` : `${styles.modal}`}
             onClick={() => setActive(false)}>
            <div className={active ? `${styles.content} ${styles.active}` : `${styles.content}`}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
