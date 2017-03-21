import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import rootReducer from './States/reducers';
import storeFactory from 'states/storeFactory';
import Manage from './Manage';
import CompList from './modules/CompList';
import CompEditor from './modules/CompEditor';

import '../../layouts/MainLayout';

const store = storeFactory()(rootReducer);
render(
    <div>
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={Manage} >
                    <IndexRoute component={CompList} />
                    <Route path="/component/*" component={CompEditor} />
                </Route>
            </Router>
        </Provider>
    </div>,
    document.getElementById('wlui-root')
)
