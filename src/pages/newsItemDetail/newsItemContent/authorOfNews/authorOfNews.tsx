import styles from "./authorOfNews.module.scss";
import React, {useState} from "react";
import {AuthorOfNewsType} from "../../../../types/News/AuthorOfNewsType";
import {NavLink} from "react-router-dom";
import {Score} from "../../../detailProfile/profile/score/score";

type Props = {
    creator: AuthorOfNewsType
}

export const AuthorOfNews = ({creator}: Props) => {
    const [isActive, setIsActive] = useState(false)
    const score = 60
    return (
        <div className={styles.user} onMouseEnter={() => setIsActive(true)}
             onMouseLeave={() => setIsActive(false)}>
            <img className={styles.userImg}
                 src={creator.profile_img}
                 alt=""/>
            <NavLink className={styles.userLogin} to={`/user/${creator.login}`}>{creator.login}</NavLink>
            {
                isActive &&
                <div className={styles.dropdown}>
                    <div className={styles.rate}>
                        <Score score={score}/>
                    </div>
                    <ul>
                        <li>
                            <span>Пол: {creator.gender}</span>
                        </li>
                        <li>
                            <span>Возраст: {creator.age ? creator.age : 0}</span>
                        </li>
                        <li>
                            <span>На сайте с: {creator.date_joined}</span>
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
