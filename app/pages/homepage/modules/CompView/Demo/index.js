import React, { Component, PropTypes } from 'react';
import { Table, Card } from 'antd';
import Playground from 'rsg-components/Playground';

import * as antd from 'antd';
import * as fivesix from 'fivesix/lib/index';
import config from 'common/config/default';

import style from './style_module.less';

const evalInContext = (code) => {
    const scope = { React, ...antd, ...fivesix };
    const func = new Function(Object.keys(scope).join(", "), 'state', 'setState', '__initialStateCB', code);
    const params = [];

    Object.keys(scope).map((key) => {
        params.push(scope[key]);
    });

    return Function.prototype.bind.apply(func, [null].concat(params));
}

export default class Demo extends Component {
    static childContextTypes = {
        config: PropTypes.object
    };

    getChildContext() {
        return { config };
    }
    render() {
        const { sample } = this.props;
        return (<Card className={style['demo-con']}>
            <div className={style['demo-title']}>{sample.title}</div>
            <div className={style['demo-desc']}>{sample.description}</div>
            <Playground
                code={sample.sourceCode || ''}
                evalInContext={evalInContext}
                name={sample.title}
                index={1}
            />
        </Card>)
    }
}
