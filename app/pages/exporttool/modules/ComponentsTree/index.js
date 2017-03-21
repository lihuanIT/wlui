import React, { Component, PropTypes } from 'react';
import { Button, Steps } from 'antd';
import Radium from 'radium';
import color from 'color';
import TableItem from './TableItem';
import { Collapse } from 'antd';
const Panel = Collapse.Panel;

var styles = {
    container: {
        marginRight: '10px',
        border: '2px solid #ccc',
    },
    title: {
        color: '#1083E6',
        margin: '10px 0 6px 0'
    }
}


@Radium
export default class ComponentsTree extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    static propTypes = {
        components: React.PropTypes.object.isRequired
    }

    render() {
        const { components } = this.props;
        return (
            <div style={styles.container}>
                <Collapse accordion bordered={false} >
                    {
                        Object.keys(components).map((key, index) => <Panel header={key} key={key}>
                            {
                                components[key].map((component, i) => {
                                    return <TableItem key={i} component={component} />
                                })
                            }
                        </Panel>)}
                </Collapse>
            </div>
        )
    }
}

