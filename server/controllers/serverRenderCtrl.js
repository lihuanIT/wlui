import React from 'react'
import { RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import config from '../../common/config'
import storeFactory from '../../app/states/storeFactory';
import rootReducer from '../../app/reducers';
import Component from '../models/Component'
import _ from 'lodash';
const  store = storeFactory()(rootReducer);

export default async (ctx, next, renderProps) => {
    //获得所有组件，按类型分组
    let components = await Component.find({isRemoved:false}).populate('samples');
    components = _.groupBy(components, 'type');
    console.log("ctx.app.env",ctx.app.env);
    await ctx.render('index', {
    title: config.title,
    dev: ctx.app.env === 'development',
    reduxData: {...store.getState(),components},
    page:ctx.params.pagename,
    app: renderToString(<Provider store={store}>
        <RouterContext {...renderProps} />
    </Provider>)
  })
}
