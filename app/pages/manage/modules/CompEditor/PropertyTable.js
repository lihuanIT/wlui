import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';

const columns = [{
    title: '参数',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: text => text.names.join(' | ')
}, {
    title: '说明',
    dataIndex: 'description',
    key: 'description',
    render: (text, record) => {
        let arr = text.split('defaultValue:');
        return arr.length && arr[0];
    }
}, {
    title: '默认值',
    dataIndex: 'description',
    key: 'default',
    render: (text, record) => {
        let arr = text.split('defaultValue:');
        return arr.length > 1 && arr[1];
    }
}];
const PropertyTable = ({data, loading}) =>
    <Table
        loading={loading}
        pagination={false}
        size="middle"
        bordered
        dataSource={data}
        columns={columns} />

export default PropertyTable;
