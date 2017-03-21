import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';

const columns = [{
    title: '参数',
    dataIndex: 'name',
    render: text => <b>{text}</b>,
}, {
    title: '类型',
    dataIndex: 'type',
    render: text => text.names.join(' | '),
}, {
    title: '说明',
    dataIndex: 'description',
    key: 'description',
    render: text => {
        let arr = text.split('defaultValue:');
        return arr.length && arr[0];
    }
}, {
    title: '默认值',
    dataIndex: 'description',
    key: 'default',
    render: text => {
        let arr = text.split('defaultValue:');
        return arr.length > 1 && arr[1];
    }
}];


export default ({component, data}) => <Table
    columns={columns}
    dataSource={data}
    bordered
    pagination={false}
/>

