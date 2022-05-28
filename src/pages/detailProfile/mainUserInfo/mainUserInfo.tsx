import styles from "./mainUserInfo.module.scss"
import {Tabs} from "./tabs/tabs";
import {useEffect, useRef, useState} from "react";
import {ListItems} from "./listItems/listItems";
import {observer} from "mobx-react-lite";
import usersStore from "../../../store/usersStore";
import {FormLoader} from "../../../components/header/formLoader/formLoader";
import {useObserver} from "../../../hooks/useObserver";

export type IsActiveType = 'comments' | 'favorite_games' | 'rated_games' | 'blogs'


export const MainUserInfo = observer(() => {
    const [isActive, setIsActive] = useState<IsActiveType>("comments")
    const {blogs_count, games_count, comments_count, id} = usersStore.userProfile!
    useEffect(() => {
        usersStore.setCurrentPage(1)
    }, [isActive])
    useEffect(() => {
        usersStore.getAdditionalUserInfoList(id, isActive)
        // eslint-disable-next-line
    }, [isActive, id, usersStore.currentPage])
    const lastElement = useRef(null)
    useObserver(lastElement, usersStore.currentPage < usersStore.totalPages, usersStore.isLoadingAdditionalData,
        () => {
            usersStore.setCurrentPage(usersStore.currentPage + 1)
        })
    return (
        <div className={styles.wrapper}>
            <Tabs blogs_count={blogs_count} comments_count={comments_count} games_count={games_count}
                  setIsActive={setIsActive} isActive={isActive}/>

            <ListItems ref={lastElement} items={usersStore.additionalUserInfoList}
                       type={usersStore.loadedDataType}/>
            {usersStore.isLoadingAdditionalData && <FormLoader/>}
        </div>
    );
});

