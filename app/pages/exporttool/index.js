import React from 'react'
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import rootReducer from './States/reducers';
import storeFactory from 'states/storeFactory';
import ExportPage from './ExportPage'

import '../../layouts/MainLayout';
const store = storeFactory()(rootReducer);

render (
    <div>
        <Provider store={store}>
            <ExportPage />
        </Provider>
    </div>
    ,
    document.getElementById('wlui-root')
)
