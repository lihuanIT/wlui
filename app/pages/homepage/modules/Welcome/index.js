import React, { Component, PropTypes } from 'react';
import style from './style_module.less';
import { Icon } from 'antd';
import connect from 'utils/connect';
import * as actions from '../../States/actions/welcome';

@connect(
    state => {
        return {
            welcome: state.welcome
        };
    },
    { actions }
)
export default class Homepage extends Component {
    render() {
        const {welcome: {info}} = this.props;

        return <div className={style['welcome-con']}>
            {info.map(item => <section key={item.title}>
                <h3><Icon type={item.icon} />{item.title}</h3>
                <p>{item.desc}</p>
            </section>)}
        </div>
    }
}
