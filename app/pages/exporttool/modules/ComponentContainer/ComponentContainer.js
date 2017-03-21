import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DropTarget } from 'react-dnd';
import LaoliziPreview from 'comp/LaoliziPreview'
import CONSTANTS from 'utils/constants'
import Radium from 'radium';
const styles = {
    container: {
        background: '#f9f9f9',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    }
};

const squareTarget = {
    drop(props, monitor, component) {
        component.addItem(monitor.getItem().component);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

@Radium
@DropTarget(CONSTANTS.COMPONENT, squareTarget, collect)
export default class ComponentContainer extends Component {
    static propTypes = {
        isOver: PropTypes.bool.isRequired
    };
    constructor(props, context) {
        super(props, context);
        this.state = {
            components: []
        }
        this.addItem = this.addItem.bind(this);
    }
    addItem(component) {
        this.setState({
            components: [...this.state.components, component]
        })
    }

    render() {
        const { connectDropTarget, isOver } = this.props;
        const components = this.state.components;
        return connectDropTarget(
            <div style={styles.container}>
                {
                    components.map((component, index) => {
                        const code = component.samples[0] && component.samples[0].sourceCode || '<div>no code</div>';
                        return <div key={index}>
                            <LaoliziPreview code={code} />
                        </div>
                    })
                }
            </div>
        )
    }
}
