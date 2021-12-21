import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {News} from "../pages/news/news";
import styles from "./routes.module.scss"
import {NewsItemDetail} from "../pages/newsItemDetail/newsItemDetail";
import {Games} from "../pages/games/games";
import {ResetPassword} from "../pages/resetPassword/resetPassword";
import {ActivationEmail} from "../pages/successfulActivationEmail/activationEmail";
import {DetailProfile} from "../pages/detailProfile/detailProfile";
import {PageNotFound} from "../components/pageNotFound/pageNotFound";
import {Main} from "../pages/main/main";

export const Routes = () => {
    return (
        <div className={styles.pageContent}>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route exact path="/news/all" component={News}/>
                <Route exact path="/news/:categorySlug" component={News}/>
                <Route exact path="/news/:categorySlug/:newsId" component={NewsItemDetail}/>
                <Route exact path="/games" component={Games}/>
                <Route exact path="/reset_password/:uid/:token" component={ResetPassword}/>
                <Route exact path="/activation/:uid/:token" component={ActivationEmail}/>
                <Route exact path="/user/:login" component={DetailProfile}/>
                <Route path='/not_found' component={PageNotFound}/>
                <Route path='*' component={() => <Redirect to={'/not_found'}/>}/>
            </Switch>
        </div>
    );
};
