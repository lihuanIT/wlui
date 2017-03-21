/**
* @Author: Li Shaoyi <laolizi>
* @Date:   2017-01-24T14:33:51+08:00
* @Email:  dllglishaoi@gmail.com
* @Last modified by:   laolizi
* @Last modified time: 2017-02-07T15:15:16+08:00
* @License: MIT
*/



import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'buble';
import * as antd from 'antd';
import * as fivesix from 'fivesix';
import $ from 'jquery';
const compileCode = code => transform(code, {
    objectAssign: 'Object.assign',
}).code;
const evalInContext = (code) => {
    let scope = { React, ...antd, ...fivesix, $ };
    var func = new Function(Object.keys(scope).join(", "), 'state', 'setState', '__initialStateCB', code);
    let params = [];
    Object.keys(scope).map((key) => {
        params.push(scope[key]);
    });
    return Function.prototype.bind.apply(func, [null].concat(params));

}

export default class LaoliziPreview extends Component {
    static propTypes = {
        code: PropTypes.string.isRequired,
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div ref="mount" />
    }

    // componentWillReceiveProps(nextProps){
    //     if (this.props.code !== nextProps.code) {
    //         this.executeCode();
    //     }
    // }
    componentDidUpdate(prevProps) {
        if (this.props.code !== prevProps.code) {
            this.executeCode();
        }
    }

    componentDidMount(prevProps) {
        if (this.props.code !== prevProps.code) {
            this.executeCode();
        }
    }

    componentDidMount() {
        this.executeCode();
    }
    executeCode() {
        const mountNode = this.refs.mount;

        try {
            ReactDOM.unmountComponentAtNode(mountNode);
        } catch (e) { }

        try {
            const compiledCode = compileCode(this.props.code);
            const compiledFuncCode = `
				return eval(${JSON.stringify(compiledCode)});
			`;
            const preivewComponent = evalInContext(compiledFuncCode);
            ReactDOM.render(
                preivewComponent(this.state, this.setState.bind(this), null),
                mountNode
            );
        } catch (err) {
            setTimeout(function () {
                ReactDOM.render(
                    <div className="playgroundError">{err.toString()}</div>,
                    mountNode
                );
            }, 500);
        }
    }
}
