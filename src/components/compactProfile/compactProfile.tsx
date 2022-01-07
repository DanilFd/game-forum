import styles from "./compactProfile.module.scss";
import React, {useState} from "react";
import {AuthorOfNewsType} from "../../types/News/AuthorOfNewsType";
import {NavLink} from "react-router-dom";
import {Score} from "../../pages/detailProfile/profile/score/score";

type Props = {
    user: AuthorOfNewsType
}

export const CompactProfile = ({user}: Props) => {
    const [isActive, setIsActive] = useState(false)
    const score = 60
    return (
        <div className={styles.user} onMouseEnter={() => setIsActive(true)}
             onMouseLeave={() => setIsActive(false)}>
            <img className={styles.userImg}
                 src={user.profile_img}
                 alt=""/>
            <NavLink className={styles.userLogin} to={`/user/${user.login}`}>{user.login}</NavLink>
            {
                isActive &&
                <div className={styles.dropdown}>
                    <div className={styles.rate}>
                        <Score score={score}/>
                    </div>
                    <ul>
                        <li>
                            <span>Пол: {user.gender}</span>
                        </li>
                        <li>
                            <span>Возраст: {user.age ? user.age : 0}</span>
                        </li>
                        <li>
                            <span>На сайте с: {user.date_joined}</span>
                        </li>
                        <li>
                            <span>Комментариев: {0}</span>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}
