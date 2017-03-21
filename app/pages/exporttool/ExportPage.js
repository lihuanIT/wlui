/**
* @Author: Li Shaoyi <laolizi>
* @Date:   2017-01-24T14:33:43+08:00
* @Email:  dllglishaoi@gmail.com
* @Last modified by:   laolizi
* @Last modified time: 2017-02-07T15:49:31+08:00
* @License: MIT
*/



import React from 'react'
import connect from 'utils/connect';
import { Layout, Button } from 'antd';
const { Sider, Content } = Layout;
import ExportModule from './modules/ExportModule'
import ComponentsTree from './modules/ComponentsTree'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import * as actions from './States/actions/exporttool';
import BlackBoard from './modules/BlackBoard';
import LinearLayoutHandle from './modules/LinearLayout/LinearLayoutHandle';
import PropertiesPanel from './modules/PropertiesPanel';


@DragDropContext(HTML5Backend)
@connect(
    state => {
        return {
            exporttool: state.exporttool,
            components: window.__REDUX_STATE__.components
        };
    },
    { actions }
)
export default class ExportPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    static childContextTypes = {
        editProps: React.PropTypes.func.isRequired
    };
    getChildContext() {
        return { editProps: this.props.actions.editProps };
    }

    render() {
        const { actions, exporttool } = this.props;
        return (
            <div>
                <Layout style={{ minHeight: "640px" }}>
                    <Sider width={214} style={{ background: "#ffffff" }}>
                        <div style={{ padding: '16px', border: '2px solid #ccc', 'border-bottom': 'none', marginRight: '10px' }}>
                            <LinearLayoutHandle />
                        </div>
                        <ComponentsTree components={this.props.components} />

                    </Sider>
                    <Content style={{ flex: 1 }}>
                        <BlackBoard actions={actions} sourceTree={exporttool.sourceTree} dataConfig={exporttool.dataConfig} editComponent={exporttool.editComponent} />
                    </Content>
                    <Sider width={300} style={{ background: "#ffffff", paddingLeft: '10px' }}>
                        <div style={{ paddingBottom: '16px' }}>
                            <Button
                                icon="export"
                                type="primary"
                                style={{ width: '100%', height: '40px' }}
                                onClick={actions.exportCode}>导出代码</Button>
                        </div>

                        <PropertiesPanel
                            actions={actions}
                            changeConfig={actions.changeConfig}
                            dataConfig={exporttool.dataConfig}
                            sourceTree={exporttool.sourceTree}
                            editComponent={exporttool.editComponent}
                        />
                    </Sider>
                </Layout>


            </div>
        )
    }
}
