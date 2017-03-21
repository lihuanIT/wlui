import React, { Component, PropTypes } from 'react';
import { Row, Col, Icon, Button } from 'antd';
import _ from 'lodash';

export default (Comp) => class AddRemove extends Component {
    onItemValueChange = (index, value, compValue, onChange) => {
        const newValue = [...compValue];

        newValue[index] = value;
        onChange && onChange(newValue);
    }
    render() {
        const {value, onChange} = this.props;

        return <div>
            {value.map((item, index) => <Row key={index}>
                <Col span={18}>
                    <Comp onChange={(change) => { onItemValueChange(index, change, value, onChange) }} defaultValue={item} />
                </Col>
                <Col offset={2} span={4}>
                    <Button
                        shape="circle"
                        icon="close"
                        type="primary"
                        onClick={() => { onChange && onChange(_.remove(value, (item, i) => index != i)) }}
                    />
                </Col>
            </Row>)}
            <Button type="dashed" onClick={() => { onChange && onChange([...value, '']) }}>
                <Icon type="plus" /> Add
    </Button>
        </div>
    }

}
