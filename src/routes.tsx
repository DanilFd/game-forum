import React from 'react';
import {Route, Switch } from 'react-router-dom';
import {News} from "./pages/news/news";

export const Routes = () => {
    return (
        <Switch>
            <Route exact path="/news" component={News}/>
        </Switch>
    );
};

