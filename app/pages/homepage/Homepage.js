import React, { Component, PropTypes } from 'react';
import connect from 'utils/connect';

import RootWrapper from '../../components/RootWrapper';
import SecondNav from '../../components/SecondNav';

const COMPONENTS = window.__REDUX_STATE__.components;
const getSecondNav = (data) => {
    let arr = [];

    for (let key in data) {
        let subs = [...data[key]];

        for (let i = 0; i < subs.length; i++) {
            subs[i].path = 'component/' + subs[i]._id;
        }

        arr.push({
            name: key,
            subs
        });
    }

    return arr;
}
export default ({ params: { splat }, children }) => <RootWrapper>
    <aside className="wlui-root-aside">
        <SecondNav current={splat} components={getSecondNav(COMPONENTS)} />
    </aside>
    <div className="wlui-root-main">{children}</div>
</RootWrapper>
