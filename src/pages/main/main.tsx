import styles from "./main.module.scss"
import {BestsNews} from "./bestsNews/bestsNews";
import {useEffect} from "react";
import homePageStore from "../../store/homePageStore";
import Loader from "../../components/loader/loader";
import {observer} from "mobx-react-lite";
import {Widget} from "./widget/widget";
import {LastsNews} from "./lastsNews/lastsNews";

export const Main = observer(() => {

    useEffect(() => {
        homePageStore.getHomePageInformation()
    }, [])
    if (homePageStore.isLoading) {
        return <Loader/>
    }
    return (
        <div className={styles.homePage}>
            <BestsNews/>
            <Widget title="Популярные блоги" items={homePageStore.bestsBlogsForWeek}/>
            <LastsNews/>
            <Widget title="Все обсуждают" items={homePageStore.discussedNews}/>
        </div>
    );
});

