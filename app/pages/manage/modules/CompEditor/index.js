import React, { Component, PropTypes } from 'react';
import connect from 'utils/connect';
import _ from 'lodash';
import { Menu, Breadcrumb, Icon, Table, Button, Form, Input, DatePicker, Col, Modal } from 'antd';

import SamplesInput from './SamplesInput';
import AddRemoveInput from './AddRemoveInput';
import SearchSelect from './SearchSelect';
import PropertyTable from './PropertyTable';

import style from './style_module.less';

import * as actions from '../../States/actions/compEditor';

const FormItem = Form.Item;

require('es6-promise').polyfill();
require('isomorphic-fetch');

@connect(
    state => {
        return {
            config: state.compEditor,
        };
    },
    { actions }
)
class CompEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            compProps: [],
        }
    }

    componentWillMount() {
        const { actions, params } = this.props;

        actions.refreshComponentDetail(params.splat);
    }

    getCompTypeOptions = () => {
        const arr = Object.keys(window.__REDUX_STATE__.components).map(item => {
            return {
                value: item,
                text: item
            }
        })
        return arr;
    }

    changePath = (value) => {
        this.props.actions.searchCompPath(value);
    }

    submitForm = (e) => {
        e.preventDefault();
        const { config: {compDetail}, actions: {saveComponent}, form: {validateFields} } = this.props;
        validateFields((err, values) => {
            if (!err) {
                if (compDetail && compDetail._id) {
                    values._id = compDetail._id;
                }
                values.samples = values.samples.map((sample) => {
                    return sample._id;
                })
                saveComponent(values);
            }
        });
    }

    goBack = () => {
        const { actions, form } = this.props;

        form.resetFields();
        actions.backToCompList();
    }

    render() {
        const {
            form: { getFieldDecorator },
            config: { compName, compDetail, compProps, searchPaths },
        } = this.props;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 }
        };

        return (<div className={style['compeditor-con']}>
            <h3>{compName ? `编辑${compName}组件` : `新增组件`}</h3>
            <a onClick={this.goBack} className={style['goback-btn']}><Icon type="left" />返回</a>
            <Form horizontal onSubmit={this.submitForm}>
                <FormItem
                    label="组件名称"
                    { ...formItemLayout }>
                    {getFieldDecorator('name', {
                        initialValue: compName,
                        rules: [{ required: true, message: '请输入组件名称' }],
                    })(<Input />)}
                </FormItem>
                <FormItem
                    label="文件绑定"
                    { ...formItemLayout }>
                    {getFieldDecorator('filePath', {
                        rules: [{ required: true, message: '请选择文件路径' }],
                        initialValue: compDetail.filePath || ''
                    })(<SearchSelect
                        options={searchPaths}
                        placeholder="选择文件绑定路径"
                        onChange={this.changePath} />)}
                </FormItem>
                <FormItem
                    label="组件说明"
                    { ...formItemLayout }>
                    {getFieldDecorator('description', {
                        initialValue: compDetail.description || ''
                    })(<Input type="textarea" />)}
                </FormItem>
                <FormItem
                    label="组件属性"
                    { ...formItemLayout }>
                    <PropertyTable data={compProps} />
                </FormItem>
                <FormItem
                    label="组件作者"
                    { ...formItemLayout }>
                    {getFieldDecorator('author', {
                        initialValue: compDetail.author || ''
                    })(<Input />)}
                </FormItem>
                <FormItem
                    label="组件版本"
                    { ...formItemLayout }>
                    {getFieldDecorator('version', {
                        initialValue: compDetail.version || ''
                    })(<Input />)}
                </FormItem>
                <FormItem
                    label="支持Antd版本"
                    { ...formItemLayout }>
                    {getFieldDecorator('supportAntVersion', {
                        initialValue: compDetail.supportAntVersion || '',
                        rules: [{ required: true, message: '请输入组件支持antd版本' }],
                    })(<Input />)}
                </FormItem>
                <FormItem
                    label="组件类型"
                    { ...formItemLayout }>
                    {getFieldDecorator('type', {
                        initialValue: compDetail.type || '',
                        rules: [{ required: true, message: '请输入组件类型' }],
                    })(<SearchSelect
                        allowCustom
                        options={this.getCompTypeOptions()}
                        placeholder="选择组件类型" />)}
                </FormItem>
                <FormItem
                    label="示例"
                    { ...formItemLayout }>
                    {getFieldDecorator('samples', {
                        initialValue: compDetail.samples ? compDetail.samples.filter(item => item != null) : []
                    })(<SamplesInput />)}
                </FormItem>
                <FormItem
                    label="应用举例"
                    { ...formItemLayout }>
                    {getFieldDecorator('useCases', {
                        initialValue: compDetail.useCases ? compDetail.useCases.filter(item => item != null) : []
                    })(<AddRemoveInput placeholder="示例：【众包业务管理】里程区间" />)}
                </FormItem>
                <FormItem
                    label="更新记录"
                    { ...formItemLayout }>
                    {getFieldDecorator('logs', {
                        initialValue: compDetail.logs ? compDetail.logs.filter(item => item != null) : []
                    })(<AddRemoveInput placeholder="示例：0.0.1：创建组件" />)}
                </FormItem>
                <FormItem
                    label="导出代码模板"
                    { ...formItemLayout }>
                    {getFieldDecorator('template', {
                        initialValue: compDetail.template || ''
                    })(<Input type="textarea" />)}
                </FormItem>
                <FormItem style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" size="large">保存</Button>
                    {' '}
                    <Button type="ghost" onClick={this.goBack}>取消</Button>
                </FormItem>
            </Form></div>)
    }
};

export default Form.create()(CompEditor);
