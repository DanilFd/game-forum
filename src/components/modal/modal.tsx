import styles from './modal.module.scss'
import {FC} from "react";
import {ImCancelCircle} from "react-icons/all";

type Props = {
    active: boolean,
    setActive: (flag:boolean) => void
}

export const Modal: FC<Props> = ({active, setActive, children}) => {
    return (
        <div className={active ? `${styles.modal} ${styles.active}` : `${styles.modal}`}
             onClick={() => setActive(false)}>
            <div className={active ? `${styles.content} ${styles.active}` : `${styles.content}`}
                 onClick={e => e.stopPropagation()}>
                <button className={styles.close} onClick={() => setActive(false)}><ImCancelCircle/></button>
                {children}
            </div>
        </div>
    )
}
