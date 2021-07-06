import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewAd from './pages/NewAd';
import Ads from './pages/Ads';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/ads/new" component={NewAd}/>
                <Route path="/ads" component={Ads}/>
            </Switch>
        </BrowserRouter>
    );
}