import React, { Component, PropTypes } from 'react';
import { Button, Steps, Icon, Tooltip } from 'antd';
import Radium from 'radium';
import color from 'color';
import uuidV4 from 'uuid/v4';
import { DragSource } from 'react-dnd';
import CONSTANTS from 'utils/constants'
import LaoliziPreview from 'comp/LaoliziPreview'

var styles = {
    tableCell: {
        position: 'relative',
        display: 'inline-block',
        lineHeight: '52px',
        marginBottom: '4px',
        marginRight: '4px',
        padding: '4px 8px',
        height: '60px',
        width: '80px',
        borderRadius: '4px',
        color: '#fff',
        background: '#ffbf00',
        textAlign: 'center',
        overflow: 'hidden',
        ':hover': {
            background: 'rgba(255, 191, 0, .4)',
            cursor: 'move'
        },
    },
    viewCon: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderTop: '13px solid #49a9ee',
        borderLeft: '13px solid transparent',
        borderRight: '13px solid #49a9ee',
        borderBottom: '13px solid transparent',
        cursor: '-webkit-zoom-in'
    },
    viewIcon: {
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        fontWeight: 'bold',
        ':hover': {
            background: 'rgba(255, 191, 0, .4)',
        },
    }
}

const componentSource = {
    beginDrag(props) {
        const uid = uuidV4();
        return { component: { ...props.component, uid } };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

@DragSource(CONSTANTS.COMPONENT, componentSource, collect)
@Radium
export default class TableItem extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    };

    componentDidMount() {

    }

    static propTypes = {
        component: React.PropTypes.object.isRequired
    }

    render() {
        const { connectDragSource, isDragging, connectDragPreview, component } = this.props;
        const {  } = this.props;

        return connectDragSource(<div style={styles.tableCell}>
            {connectDragPreview(<span>{component.name}</span>)}
            <span style={styles.viewCon}><Tooltip trigger="click" placement="rightTop" title={(<LaoliziPreview code={component.samples[0].sourceCode} />)}>
                <Icon style={styles.viewIcon} type="eye-o" />
            </Tooltip></span>
        </div>)
    }
}
