import React from 'react';
import moment from 'moment';

import { UPDATE_COMPONENTS } from '../actions/compList';

const initialState = {
    components: window.__REDUX_STATE__.components,
    tableColumns: [{
        title: '组件名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <a
            data-id={record._id}
            data-type="modify"
            href="javascript:void(0)">
            {text}
        </a>,
    }, {
        title: '组件版本',
        dataIndex: 'version',
        key: 'version',
    }, {
        title: '开发者',
        dataIndex: 'author',
        key: 'author',
    }, {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
    }, {
        title: '修改日期',
        dataIndex: 'updated',
        key: 'updated',
        render: (text, record) => {
            return moment(text).format("YYYY-MM-DD HH:mm")
        }
    }, {
        title: '操作',
        dataIndex: '_id',
        key: 'action',
        render: (text, record) => <span>
            <a
                data-id={text}
                data-type="modify"
                href="javascript:void(0)">
                修改
            </a>
            <span className="ant-divider" />
            <a
                data-id={text}
                data-type="delete"
                data-data={encodeURIComponent(JSON.stringify(record))}
                href="javascript:void(0)">
                删除
            </a>
        </span>,
    }]
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_COMPONENTS:
            return {
                ...state,
                components: action.components
            };
            break;
        default:
            return state;
    }
}
