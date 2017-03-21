import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import rootReducer from './States/reducers';
import storeFactory from 'states/storeFactory';
import Homepage from './Homepage';
import CompView from './modules/CompView';
import Welcome from './modules/Welcome';

import '../../layouts/MainLayout';

const store = storeFactory()(rootReducer);

render(
    <div>
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={Homepage} >
                    <IndexRoute component={Welcome} />
                    <Route path="/component/*" component={CompView} ></Route>
                </Route>
            </Router>
        </Provider>
    </div>,
    document.getElementById('wlui-root')
)
