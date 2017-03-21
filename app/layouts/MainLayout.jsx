import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Header from '../components/Header'
import 'normalize.css'
import 'fivesix/dist/fivesix.min.css'

@connect(
    state => {
        return {
            mainlayout: state.mainlayout
        };
    }
)
export default class MainLayout extends Component {
    render() {
        const { mainlayout: { pages }, params: { splat } } = this.props;
        return (
            <div className="wlui-layout">
                <Header pages={pages} current={splat} id="wlui-header" />
                <div id="wlui-root"></div>
            </div>
        )
    }
}
