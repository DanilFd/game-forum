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
import {Feed} from "../pages/feed/feed";
import {Messages} from "../pages/messages/messages";
import {NewDialog} from "../pages/newDialog/newDialog";
import {DialogDetail} from "../pages/dialogDetail/dialogDetail";
import authStore from "../store/authStore";
import {observer} from "mobx-react-lite";

export const Routes = observer(() => {
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
                {authStore.isAuth && <Route exact path="/feed" component={Feed}/>}
                {authStore.isAuth && <Route exact path="/pm" component={Messages}/>}
                {authStore.isAuth && <Route exact path="/pm/new" component={NewDialog}/>}
                {authStore.isAuth && <Route exact path="/pm/read/:dialogId" component={DialogDetail}/>}
                <Route path='/not_found' component={PageNotFound}/>
                {!authStore.isLoading && <Route path='*' component={() => <Redirect to={'/not_found'}/>}/>}
            </Switch>
        </div>
    );
});
