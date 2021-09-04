import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {News} from "../pages/news/news";
import styles from "./routes.module.scss"

export const Routes = () => {
    return (
        <div className={styles.pageContent}>
            <Switch>
                <Route exact path="/news" component={News}/>
                <Route exact path="/news/:categorySlug" component={News}/>
            </Switch>
        </div>
    );
};

