import {IsActiveType} from "../mainUserInfo";
import {Game} from "../../../games/game/game";
import {CommentCard} from "./cards/commentCard/commentCard";
import {BlogCard} from "../../../blogs/blogsList/blogCard/blogCard";
import styles from "./cards/gameCard/gameCard.module.scss"
import React, {forwardRef, Fragment} from "react";

type Props = {
    items: any[]
    type: IsActiveType
}
type FoundItemType = ({item}: any) => JSX.Element
export const ListItems = forwardRef<HTMLDivElement, Props>(({items, type}, ref) => {
    // @ts-ignore
    const FoundItem: FoundItemType = {
        favorite_games: Game,
        rated_games: Game,
        blogs: BlogCard,
        comments: CommentCard
    }[type]
    return (
        <div>
            {items.map((item, index) => {
                return (
                    <Fragment key={item.id}>
                        <FoundItem key={item.id} className={styles.game} item={item}/>
                        {index === items.length - 1 &&
                        <div ref={ref} style={{minHeight: 1}}/>}
                    </Fragment>
                )
            })}
        </div>
    );
});

