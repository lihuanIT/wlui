import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Breadcrumb, Icon, Input, Select } from 'antd';

import './style.less';

const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const Option = Select.Option;

const COMPONENT_ARR = () => {
    let arr = [];
    Object.keys(scope).map((key) => {
        arr.concat(scope[key]);
    });
    return arr;
};

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchList: []
        }
    }
    getSearchList = (search) => {
        const list = [];

        if (search) {
            for (let i = 0, len = COMPONENT_ARR.length; i < len; i++) {
                if (COMPONENT_ARR[i].name.indexOf(search) !== -1) {
                    list.push(COMPONENT_ARR[i]);
                }
            }
        }

        return list;
    }

    handleSearch = (value) => {
        this.setState({
            searchList: this.getSearchList(value)
        })
    }

    render() {
        const { pages, current } = this.props;
        const { searchList } = this.state;

        return (<div className="wlui-layout-header">
            <h2>FiveSixUI</h2>
            <div id="wlui-layout-search"></div>
            <div className="wlui-layout-topnav">
                <ul>
                    {pages.map((page, index) =>
                        <li key={page.key} className={current === page.key ? 'topnav-active' : ''}>
                            <h3>
                                <Link to={current === page.key ? 'javascript:void(0)' : page.path}><Icon type={page.icon} />{page.key}</Link>
                            </h3>
                        </li>
                    )}
                </ul>
            </div>
        </div>);
    }
}
