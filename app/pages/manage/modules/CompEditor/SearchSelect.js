import React, { Component } from 'react';
import { Select, Input, Button } from 'antd';
const Option = Select.Option;

export default class SearchSelect extends Component {
    render() {
        const { value, options, placeholder, allowCustom, onChange } = this.props;
        return <Input.Group compact style={{ width: '500px' }}>
            <Select
                combobox
                value={value}
                placeholder={placeholder || ''}
                showArrow={false}
                filterOption={false}
                style={{ width: '400px' }}
                onChange={(value) => onChange && onChange(value)}>
                {options.map(d => <Option key={d.value}>{d.text}</Option>)}
            </Select>
            <Button type="primary" icon="search"></Button>
        </Input.Group>
    }
}
