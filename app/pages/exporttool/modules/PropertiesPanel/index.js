/**
* @Author: Li Shaoyi <laolizi>
* @Date:   2017-01-24T14:33:43+08:00
* @Email:  dllglishaoi@gmail.com
* @Last modified by:   laolizi
* @Last modified time: 2017-02-07T15:46:29+08:00
* @License: MIT
*/



import React, { Component, PropTypes } from 'react';
import { Button, Steps, Icon, Select, Form, Input, Card } from 'antd';
import Radium from 'radium';
import color from 'color';
const Option = Select.Option;
const FormItem = Form.Item;
const styles = {
    container: {
        border: '1px solid #ccc',
        borderRadius: '6px',
    },
    title: {
        fontWeight: '700',
        textAlign: 'center',
        padding: '10px 0',
        background: '#404040',
        color: '#fff',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',
    },
    form: {
        padding: '15px 10px 0'
    }
}

const componentSource = {
    beginDrag(props) {
        return { component: props.component };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}
@Form.create()
@Radium
export default class PropertiesPanel extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {

    };

    componentDidMount() {

    }
    changeConfig(key, value) {
        console.log(key, value);
        const { changeConfig, editComponent } = this.props;
        changeConfig(editComponent.uid, key, value);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.editComponent && (nextProps.editComponent.uid != this.props.editComponent.uid)) {
            this.props.form.resetFields();
        }
    }

    deleteComp(uid) {
        const { deleteComp } = this.props.actions;
        deleteComp(uid);
    }

    render() {
        const { editComponent, dataConfig, sourceTree } = this.props;
        // console.log("dataConfig",dataConfig);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const config = editComponent && dataConfig[editComponent.uid] || {};
        const changeConfig = this.changeConfig.bind(this);
        const deleteComp = this.deleteComp.bind(this, editComponent && editComponent.uid);
        const component = editComponent && sourceTree[editComponent.uid] || null;
        return <div>
            {editComponent &&
                <div style={styles.container}>
                    <div style={styles.title}>组件属性</div>
                    <Form style={styles.form} onSubmit={this.handleSubmit}>
                        {component && component.layout_type ? (
                            <FormItem
                                {...formItemLayout}
                                label="方向"
                                hasFeedback>
                                {getFieldDecorator('flexFlow', {
                                    initialValue: config.flexFlow,
                                })(<Select style={{ width: 120 }} onChange={this.changeConfig.bind(this, 'flexFlow')}>
                                    <Option value="row">水平布局</Option>
                                    <Option value="column">垂直布局</Option>
                                </Select>)}
                            </FormItem>
                        ) : (<div>
                            {Object.keys(config).map((key, index) => <FormItem
                                {...formItemLayout}
                                label={key}
                                key={index}>
                                {getFieldDecorator(key, {
                                    initialValue: config[key],
                                })(<Input
                                    type="textarea"
                                    onChange={(e) => { changeConfig(key, e.target.value); }}
                                />)}
                            </FormItem>
                            )}
                        </div>)}
                    </Form>
                </div>
            }
        </div>
    }
}
