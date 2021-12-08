import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {News} from "../pages/news/news";
import styles from "./routes.module.scss"
import {NewsItemDetail} from "../pages/news/newsItemDetail/newsItemDetail";
import {Games} from "../pages/games/games";
import {ResetPassword} from "../pages/resetPassword/resetPassword";

export const Routes = () => {
    return (
        <div className={styles.pageContent}>
            <Switch>
                <Route exact path="/news/all" component={News}/>
                <Route exact path="/news/:categorySlug" component={News}/>
                <Route exact path="/news/:categorySlug/:newsId" component={NewsItemDetail}/>
                <Route exact path="/games" component={Games}/>
                <Route exact path={"/reset_password/:uid/:token"} component={ResetPassword}/>
            </Switch>
        </div>
    );
};

