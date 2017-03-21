import React, { Component, PropTypes } from 'react';
import AddRemove from './AddRemove';
import { Input } from 'antd';

@AddRemove

export default class useCase extends Component {
    render() {
        const {defaultValue, placeholder, onChange} = this.props;

        return <Input
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={(e) => onChange && onChange(e.target.value)} />
    }
}
