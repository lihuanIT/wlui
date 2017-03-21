/**
* @Author: Li Shaoyi <laolizi>
* @Date:   2017-01-24T14:33:43+08:00
* @Email:  dllglishaoi@gmail.com
* @Last modified by:   laolizi
* @Last modified time: 2017-02-07T16:45:36+08:00
* @License: MIT
*/



import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Button, Steps, Icon } from 'antd';
import Radium from 'radium';
import color from 'color';
import { DragSource } from 'react-dnd';
import uuidV4 from 'uuid/v4';
import CONSTANTS from 'utils/constants'
import { DropTarget } from 'react-dnd';
import LaoliziPreview from 'comp/LaoliziPreview'
import EditableComponent from '../Enhancers/EditableComponent'
const ComponetView = EditableComponent(LaoliziPreview);
import { codeGenerator } from 'utils/pandorasBox'

const squareTarget = {
    drop(props, monitor, component) {
        if (monitor.isOver() && monitor.isOver({ shallow: false })) {
            component.addItem(monitor.getItem().component);
        }

    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

@EditableComponent
@Radium
@DropTarget([CONSTANTS.COMPONENT, CONSTANTS.LAYOUTS.LINEAR_LAYOUT], squareTarget, collect)
export default class LinearLayout extends Component {
    constructor(props) {
        super(props);
        const { editComponent } = this.props;
        this.addItem = this.addItem.bind(this);
        this.state = {
            components: [],
            style: {
                minHeight: "30px",
                minWidth: "30px",
                display: 'flex'
            }
        }
    }

    static propTypes = {
        isOver: PropTypes.bool.isRequired
    };

    componentDidMount() {
    }

    addItem(component) {
        component
        this.setState({
            components: [...this.state.components, component]
        })
        const { actions, uid } = this.props;
        component.parentId = uid;
        actions.createNode(component);
        actions.addChild(this.props.uid, component);
        actions.editProps(component.uid, component.filePath);
    }

    deleteComp(uid) {
        // deleteComp
        this.setState({
            components: _.filter(this.state.components, (item, index) => {
                return item.uid != uid;
            })
        })
        const { actions, component } = this.props;
        actions.removeChild(uid);
        actions.deleteNode(uid);

    }

    render() {
        const { editComponent, dataConfig, uid, actions } = this.props;
        const { connectDropTarget, isOver } = this.props;
        const components = this.state.components;
        const currentDataConfig = dataConfig || {}
        const deleteComp = this.deleteComp.bind(this);
        return connectDropTarget(
            <div style={{
                ...this.state.style,
                ...currentDataConfig[uid]
            }}>
                {
                    components.map((component, index) => {
                        const code = component.template ? codeGenerator(component.template, currentDataConfig[component.uid] : {}) : (component.samples && component.samples[0] && component.samples[0].sourceCode);
                        if(component.layout_type){
                            const MyLayout = component.layout;
                            return <MyLayout actions={actions} deleteComp={deleteComp} compUid={component.uid} component={component} dataConfig={dataConfig} editComponent={editComponent} key={index} />
                }else {
                            return <ComponetView deleteComp={deleteComp} compUid={component.uid} component={component} dataConfig={dataConfig} editComponent={editComponent} key={index} dataConfig={dataConfig} code={code} />
                }

                    })
                }
            </div>
        )
    }
}
