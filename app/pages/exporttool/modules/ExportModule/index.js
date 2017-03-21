import React, { Component, PropTypes} from 'react';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Playground from 'rsg-components/Playground';
import * as antd from 'antd';
import * as fivesix from 'fivesix/lib/index';
import config from 'common/config/default'
import LaoliziPreview from 'comp/LaoliziPreview'
import ComponentContainer from '../ComponentContainer';
import { Button,Steps } from 'antd';
const Step = Steps.Step;
const evalInContext = (code) =>{
			let scope = {React,...antd,...fivesix};
			var func = new Function (Object.keys(scope).join(", "), 'state', 'setState', '__initialStateCB', code);
			let params = [];
			Object.keys(scope).map((key)=>{
				params.push(scope[key]);
			});
			return Function.prototype.bind.apply(func, [null].concat(params));

		}

export default class ExportModule extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }
    static childContextTypes = {
        config: React.PropTypes.object
    };

    getChildContext() {
        return {
            config
        };
    }

    render() {
		const { layout } = this.props;
        return (
          <ReactGridLayout className="layout" layout={layout} cols={24} rowHeight={30} width={1200}>
			  {
				  layout.map((item,index)=>{
					  return <div style={{border:'1px dashed #9c9c9c'}} key={item.i}>
		                  <ComponentContainer />
		              </div>
				  })
			  }
          </ReactGridLayout>
        )
    }
}
