/**
* @Author: Li Shaoyi <laolizi>
* @Date:   2017-01-24T14:33:43+08:00
* @Email:  dllglishaoi@gmail.com
* @Last modified by:   laolizi
* @Last modified time: 2017-02-07T15:33:56+08:00
* @License: MIT
*/


import React, { Component, PropTypes } from 'react';
import { Button, Steps, Icon } from 'antd';
import Radium from 'radium';
import color from 'color';
import { DragSource } from 'react-dnd';
import CONSTANTS from 'utils/constants'
import LinearLayout from './index'
import uuidV4 from 'uuid/v4';

var styles = {
    layoutButton: {
        width: '168px',
        height: '60px',
        background: '#ecf6fd',
        borderColor: '#49a9ee',
        color: '#49a9ee',
        cursor: 'move',
    },
}

const componentSource = {
    beginDrag(props) {
        const uid = uuidV4();
        return {
            component: {
                layout_type: CONSTANTS.LAYOUTS.LINEAR_LAYOUT,
                layout: LinearLayout,
                uid
            }
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

@DragSource(CONSTANTS.LAYOUTS.LINEAR_LAYOUT, componentSource, collect)
@Radium
export default class LinearLayoutHandle extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    };

    componentDidMount() {

    }

    render() {
        const { connectDragSource, isDragging, connectDragPreview } = this.props;
        const { component } = this.props;
        return connectDragSource(<div>
            <Button icon="tablet" type="primary" style={styles.layoutButton}>
                {connectDragPreview(<span>线性布局</span>)}
            </Button>
        </div>)

    }
}
