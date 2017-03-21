import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon } from 'antd';

import style from './style_module.less';

export default class SecondNav extends Component {
    render() {
        const { current, components } = this.props;

        return (
            <div className={style['secondnav-con']}>
                <ul>
                    {components.map(menu =>
                        <li key={menu.name}>
                            <h4>{menu.name}</h4>
                            <ul>
                                {menu.subs.map((sub, index) =>
                                    <li key={sub._id} className={current === sub._id ? style['secondnav-active'] : ''}>
                                        {current === sub._id ? <Icon type="caret-right" /> : ''}
                                        <Link to={sub.path}>{sub.name}</Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
