import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';
import SampleEditor from './SampleEditor';
import AddRemove from './AddRemove';

require('es6-promise').polyfill();
require('isomorphic-fetch');

@AddRemove
export default class SamplesInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sampleModalShown: false,
            id: props.defaultValue._id,
            title: props.defaultValue.title
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState(nextProps.value);
        }
    }
    saveSample = (data, callback) => {
        const url = `/api/sample${data.id ? '/' + data.id : ''}`;
        const method = data.id ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                callback && callback(new Error("Bad response from server"), null);
            }
            return response.json();
        }).then(function (stories) {
            callback && callback(null, stories);
        });
    }
    handleSubmit = (values) => {
        const { onChange } = this.props;

        this.saveSample(values, (err, res) => {
            if (!err) {
                this.setState({
                    sampleModalShown: false,
                    title: res.data.title,
                    id: res.data._id,
                });
                onChange && onChange(res.data);
            }
        });
    }

    editSample = () => {
        this.setState({ sampleModalShown: true });
    }
    hide = () => {
        this.setState({ sampleModalShown: false });
    }
    render() {
        const {title, sampleModalShown} = this.state;

        return <div>
            <Button onClick={this.editSample}>
                {title || '编辑'}
            </Button>
            <SampleEditor
                show={sampleModalShown}
                submit={this.handleSubmit}
                hide={this.hide}
                sample={this.props.defaultValue}
            />
        </div>
    }
}
