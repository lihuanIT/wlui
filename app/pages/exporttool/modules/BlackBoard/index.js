import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DropTarget } from 'react-dnd';
import LaoliziPreview from 'comp/LaoliziPreview'
import CONSTANTS from 'utils/constants'
import Radium from 'radium';
import LinearLayout from '../LinearLayout';
import uuidV4 from 'uuid/v4';

const styles = {
    container: {
        background: '#f9f9f9',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        maxWidth: '100%',
        border: "2px solid #ccc",
    }
};

const squareTarget = {
    drop(props, monitor, component) {
        if (monitor.isOver() && monitor.isOver({ shallow: false })) {
            const type = monitor.getItem().component.layout_type;
            switch (type) {
                case CONSTANTS.LAYOUTS.LINEAR_LAYOUT:
                    component.addItem(monitor.getItem().component);
                    break;
                default:
            }
        }
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

@Radium
@DropTarget([CONSTANTS.LAYOUTS.LINEAR_LAYOUT], squareTarget, collect)
export default class BlackBoard extends Component {
    static propTypes = {
        isOver: PropTypes.bool.isRequired
    };
    constructor(props, context) {
        super(props, context);
        this.state = {
            layouts: []
        }
        this.addItem = this.addItem.bind(this);
    }
    addItem(component) {
        component.isRootNode = true;
        this.setState({
            layouts: [...this.state.layouts, component]
        })
        const { createNode } = this.props.actions;
        createNode(component);
    }

    deleteComp(uid) {
        this.setState({
            layouts: _.filter(this.state.layouts, (item, index) => {
                return item.uid != uid;
            })
        })
        const { actions } = this.props;
        actions.deleteNode(uid);
    }

    render() {
        const { connectDropTarget, isOver, editComponent, dataConfig, sourceTree, actions } = this.props;
        const layouts = this.state.layouts;
        const deleteComp = this.deleteComp.bind(this);
        return connectDropTarget(
            <div style={styles.container}>
                {
                    layouts.map((component, index) => {
                        const MyLayout = component.layout;
                        return <MyLayout actions={actions} compUid={component.uid} deleteComp={deleteComp} key={index} dataConfig={dataConfig} editComponent={editComponent} />
                    })
                }
            </div>
        )
    }
}
