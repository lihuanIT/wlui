import React, { Component } from 'react';
import { Link } from 'react-router';
import { Input, Icon } from 'antd';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            searchResult: []
        }
    }
    getSearchResult(comps, search) {
        const list = [];

        if (search) {
            for (let i = 0, len = comps.length; i < len; i++) {
                if (comps[i].name.indexOf(search) !== -1) {
                    list.push(comps[i]);
                }
            }
        }

        return list;
    }

    searchComponent = (e) => {
        const searchValue = e.target.value;

        this.setState({
            searchValue,
            searchResult: this.getSearchResult(this.props.list, searchValue)
        })
    }

    clearSearch = (e) => {
        this.setState({
            searchValue: '',
            searchResult: []
        })
    }

    viewComponent = (e) => {
        this.setState({
            searchValue: '',
            searchResult: []
        })
    }

    render() {
        const { searchValue, searchResult } = this.state;

        return (<div className="wlui-layout-search">
            <Input
                value ={searchValue}
                placeholder="Search Component..."
                prefix={<Icon type="search" />}
                suffix = { searchValue ? <Icon type="close-circle" onClick={this.clearSearch} /> : null}
                onChange={this.searchComponent}
            />
            {!!searchResult.length && <div className="ant-select-dropdown">
                <div style={{ overflow: 'auto' }}>
                    <ul>
                        {
                            searchResult.map((item, index) => <li key={item._id} className="ant-select-dropdown-menu-item">
                                <a href={'homepage#/component/' + item._id} onClick={this.viewComponent}>
                                    {item.name}
                                    <span className="desc">{item.type}</span>
                                </a>
                            </li>)
                        }
                    </ul>
                </div>
            </div>}
        </div>);
    }
}
