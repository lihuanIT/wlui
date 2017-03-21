import React, { Component, PropTypes } from 'react';
import { Button, Form, Input, Modal } from 'antd';
const FormItem = Form.Item;
import PlayGround from '../../../../components/Playground';

class SampleEditor extends Component {
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submit(values);
            }
        });
    }
    hide = () => {
        this.props.hide && this.props.hide();
    }

    render() {
        const { sample, show, form: { getFieldDecorator }} = this.props;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 }
        };

        return <Modal
            title="编辑示例"
            visible={show}
            onOk={this.handleSubmit}
            onCancel={this.hide}>
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                    label="id"
                    { ...formItemLayout }>
                    {getFieldDecorator('id', {
                        initialValue: sample ? sample._id : ''
                    })(<Input disabled />)}

                </FormItem>
                <FormItem
                    label="示例标题"
                    { ...formItemLayout }>
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入示例标题' }],
                        initialValue: sample ? sample.title : ''
                    })(<Input />)}
                </FormItem>
                <FormItem
                    label="示例描述"
                    { ...formItemLayout }>
                    {getFieldDecorator('description', {
                        rules: [{ required: true, message: '请输入示例描述' }],
                        initialValue: sample ? sample.description : ''
                    })(<Input />)}
                </FormItem>
                <FormItem
                    label="示例代码"
                    { ...formItemLayout }>
                    {getFieldDecorator('sourceCode', {
                        initialValue: sample ? sample.sourceCode : '<Button />'
                    })(<PlayGround />)}
                </FormItem>
            </Form>
        </Modal>
    }
}

export default Form.create()(SampleEditor);
