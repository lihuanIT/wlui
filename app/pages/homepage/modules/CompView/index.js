import React, { Component, PropTypes } from 'react';
import connect from 'utils/connect';
import { Timeline, Icon, Tag, Button, Tooltip } from 'antd';
import Playground from 'rsg-components/Playground';
import * as actions from '../../States/actions/compView';
import ApiTable from './ApiTable';
import Demo from './Demo';

import style from './style_module.less';

@connect(
    state => {
        return {
            compView: state.compView
        };
    },
    { actions }
)
export default class compView extends Component {
    componentDidMount() {
        const { params: { splat }, actions } = this.props;

        actions.getComponentData(splat);
    }

    componentWillReceiveProps(nextProps) {
        const { params: { splat }, actions } = nextProps;

        if (splat != this.props.params.splat) {
            actions.getComponentData(splat);
        }
    }

    editComponent = () => {
        window.location = 'manage#/component/' + this.props.compView.component._id;
    }

    render() {
        const { compView: { component } } = this.props;
        console.log(this.props)
        return (
            <div className={style['compview-con']}>
                {component ? <div>
                    <h5>{component.name}
                        <Tooltip placement="right" title="编辑该组件">
                            <Icon type="edit" onClick={this.editComponent} />
                        </Tooltip>
                    </h5>
                    <Button
                        className={style['compview-goback']}
                        type="primary"
                        shape="circle"
                        icon="home"
                        size="large"
                        onClick={() => { location.href = '#/' }} />
                    <div className={style['compview-desc']}>
                        <p><b>Author:</b>{component.author}</p>
                        <p><b>Version:</b>{component.version}</p>
                        <p><b>Ant support:</b>{component.supportAntVersion}</p>
                        <p><b>Description:</b>{component.description}</p>
                    </div>
                    <h6>API</h6>
                    <ApiTable data={component.properties} />
                    <h6>示例</h6>
                    <div className={'demos'}>
                        {component.samples.map((sample, index) => {
                            return <Demo key={index} sample={sample} />;
                        })}
                    </div>
                    <h6>应用举例</h6>
                    {component.useCases.map((item, index) => {
                        return <Tag key={index}>{item}</Tag>
                    })}
                    <h6>组件更新维护记录</h6>
                    <Timeline>
                        {component.logs.map((item, index) => {
                            return <Timeline.Item key={index}>{item}</Timeline.Item>
                        })}
                    </Timeline>
                </div> : ''}
            </div>
        )
    }
}
