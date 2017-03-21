import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from './Search';

export default class RootWrapper extends Component {
    componentDidMount() {
        const comps = (() => {
            let arr = [];
            Object.keys(window.__REDUX_STATE__.components).forEach((key) => {
                arr = arr.concat(window.__REDUX_STATE__.components[key]);
            });
            return arr;
        })();

        ReactDOM.render(<Search list={comps} />, document.getElementById('wlui-layout-search'));
    }
    render() {
        return (
            <div className="wlui-root-wrapper">
                {this.props.children}
            </div>
        );
    }
}
