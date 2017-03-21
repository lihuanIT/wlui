import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import connect from 'utils/connect';
import { Table, Button, Modal, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import * as actions from '../../States/actions/compList';

@connect(
    state => {
        return {
            compList: state.compList,
        };
    },
    { actions }
)

export default class CompList extends Component {
    componentDidMount() {
        const { removeComponent, modifyComponent } = this.props.actions;


        this.$table = $(ReactDOM.findDOMNode(this.refs['compListCon']));

        this.$table.off('click').on('click', '[data-type="delete"]', function (e) {
            const $target = $(e.currentTarget);
            const data = JSON.parse(decodeURIComponent($target.attr('data-data')));

            Modal.confirm({
                title: `确定要删除组件“${data.name}”吗?`,
                onOk() {
                    removeComponent(data._id);
                },
            });
        }).on('click', '[data-type="modify"]', function (e) {
            const $target = $(e.currentTarget);
            const id = $target.attr('data-id');

            modifyComponent(id);
        });
    }
    render() {
        const { compList: { tableColumns, components }, actions: { modifyComponent } } = this.props;

        return <div ref="compListCon">
            <Tabs tabBarExtraContent={(
                <Button
                    type="primary"
                    icon="plus-circle-o"
                    onClick={modifyComponent.bind(null, 'new')}>
                    新增组件
            </Button>)}>
                {Object.keys(components).map(item => <TabPane tab={item} key={item}>
                    <Table
                        pagination={false}
                        columns={tableColumns}

                        dataSource={components[item]} />
                </TabPane>)}
            </Tabs>
        </div>
    }
}
