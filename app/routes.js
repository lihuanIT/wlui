import MainLayout from './layouts/MainLayout'
import { Router, Route, browserHistory } from 'react-router'
import React from 'react'


export default (
<Router history={browserHistory}>
    <Route path="/wlui/*" component={MainLayout}>
    </Route>
</Router>

)
