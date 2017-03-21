/**
* @Author: Li Shaoyi <laolizi>
* @Date:   2017-01-24T14:33:43+08:00
* @Email:  dllglishaoi@gmail.com
* @Last modified by:   laolizi
* @Last modified time: 2017-02-07T16:51:16+08:00
* @License: MIT
*/



import React, { Component, PropTypes } from 'react';
import { Button, Steps, Icon } from 'antd';
import Radium from 'radium';
import color from 'color';
import { DragSource } from 'react-dnd';
import uuidV4 from 'uuid/v4';
import CONSTANTS from 'utils/constants'
import { DropTarget } from 'react-dnd';

const EditableComponent = ComponsedComponent => class extends Component {

    constructor(props) {
        super(props);
        const { editComponent, compUid } = this.props;
        this.editProps = this.editProps.bind(this);
        const uid = compUid || uuidV4();
        this.state = {
            uid: uid,
            components: [],
            style: {
                border: (editComponent && editComponent.uid == uid) ? '2px dashed #0e77ca' : '1px dashed #dedede',
                margin: '3px',
                padding: '5px 8px',
                minHeight: "30px",
                minWidth: "30px",
                position: 'relative'
            }
        }
    }


    static contextTypes = {
        editProps: React.PropTypes.func.isRequired
    };

    editProps(e) {
        const { editProps } = this.context;
        const { component } = this.props;
        e.stopPropagation();
        editProps(this.state.uid, component && component.filePath);
    }

    componentWillReceiveProps(nextProps) {
        const { editComponent } = nextProps;
        this.setState({
            style: {
                ...this.state.style,
                border: (editComponent && editComponent.uid == this.state.uid) ? '2px dashed #0e77ca' : '1px dashed #dedede'
            }
        })
    }
    deleteComp(uid) {
        const { deleteComp } = this.props;
        deleteComp && deleteComp(uid);
    }

    componentDidUpdate(prevProps) {
        //   console.log("source",this.props.code);
    }

    render() {
        const { editComponent, dataConfig } = this.props;
        const {uid} = this.state;
        const currentDataConfig = dataConfig;
        const deleteComp = this.deleteComp.bind(this, uid);
        console.log(uid)

        return (<div style={{
            ...this.state.style
        }} onClick={this.editProps}>
            <ComponsedComponent {...this.props} {...this.state} />
            {
                editComponent && (editComponent.uid == this.state.uid) ? (
                    <a style={{ fontSize: '16px', color: '#0e77ca', position: 'absolute', top: '-5px', right: '-8px' }}>
                        <Icon type="close-circle" onClick={deleteComp} />
                    </a>
                ) : ''
            }


        </div>);
    }
};

export default EditableComponent
