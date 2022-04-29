import styles from "./modestUserItem.module.scss"
import {NavLink} from "react-router-dom";
import {SetState} from "../../../../types/utils/utils";
import React, {useCallback} from "react"
import {ModestUser} from "../../../../types/Users/ModestUser";
import {FaRegComments} from "react-icons/all";

type Props = {
    item: ModestUser
    setIsSearchActive: SetState<boolean>

}

export const ModestUserItem = ({item, setIsSearchActive}: Props) => {
    const colorForUserRating = useCallback(() => {
        if (item.rating >= 100)
            return 'green'
        if (item.rating >= 50)
            return "#FCBE64"
        if (item.rating > 0)
            return "#fb9400"
        if (item.rating < 0)
            return "red"
        return "white"
    }, [item.rating])
    return (
        <NavLink to={`/user/${item.login}`} onClick={() => setIsSearchActive(false)} className={styles.card}>
            <div className={styles.cardTop}>
                <img className={styles.image} src={item.profile_img} alt=""/>
                <span style={{color: colorForUserRating()}}
                      className={styles.rating}>{item.rating > 0 && "+"}{item.rating}</span>
            </div>
            <h3 className={styles.title}>{item.login}</h3>
            <div className={styles.bottomInfo}>
                <span className={styles.dateJoined}>На сайте: <br/> с {item.date_joined}</span>
                <div className={styles.commentsCountContainer}>
                    <FaRegComments/>
                    <span className={styles.commentsCount}>{item.comments_count}</span>
                </div>
            </div>
        </NavLink>
    );
};

