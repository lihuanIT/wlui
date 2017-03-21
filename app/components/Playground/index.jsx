import React, {Component, PropTypes} from 'react';
import ReactDom from 'react-dom';
import Playground from 'component-playground';
import 'component-playground/demo/styles/demo.css';
import 'component-playground/demo/styles/syntax.css';
import 'component-playground/demo/styles/codemirror.css';
import * as antd from 'antd';
import * as fivesix from 'fivesix/lib/index';
import './style.less';
import Codemirror from 'react-codemirror';
import {debounce} from 'lodash';
require('codemirror/mode/jsx/jsx');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/duotone-light.css');
const {Card, Icon, Row, Col} = antd;

class PlaygroundItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsable: false,
      console: false,
      IQ: false,
      switchCol: false,
      switchCon: false,
      switchIQ: false,
      reactCode: props.value,
      consoleCode: 'console.log(\'hello world\')',
      smartCode: `const Comp = (props) => ${props.value};
ReactDom.render(<Comp />, mountNode);`
    };
    this.handleMouseEnter = (e) => {
      const init = {
        collapsable: false,
        console: false,
        IQ: false
      };
      this.setState({...init, [e.target.id]: true});
    };
    this.handleClick = (e) => {
      switch (e.currentTarget.id) {
        case 'collapsable':
          this.setState({
            switchCol: !this.state.switchCol
          });
          break;
        case 'console':
          this.setState({
            switchCon: !this.state.switchCon,
            switchIQ: false
          });
          !this.state.switchCon && this.props.onChange(this.state.consoleCode);
          this.state.switchCon && this.props.onChange(this.state.reactCode);
          break;
        case 'IQ':
          this.setState({
            switchIQ: !this.state.switchIQ,
            switchCon: false
          });
          !this.state.switchIQ && this.props.onChange(this.state.smartCode);
          this.state.switchIQ && this.props.onChange(this.state.reactCode);
          break;
        default:
          break;
      }
    };
  }
  render() {
    return (
      <div id="myplayground">
        <Card bordered={false} bodyStyle={{padding: '10px'}}>
          <Row type="flex" align="center" justify="middle" style={{textAlign: 'center', fontSize: '17px', cursor: 'pointer'}} >
            <Col span={8} id="collapsable" onMouseEnter={this.handleMouseEnter} style={{borderRightStyle: 'dashed', borderRightWidth: '1px'}} onClick={this.handleClick} >
              <Icon type={this.state.switchCol ? 'eye-o' : 'eye'} />
              <b className={this.state.switchCol && 'transparentText'} style={{display: this.state.collapsable ? '' : 'none'}}>{'Show Code'}</b>
            </Col>
            <Col span={8} id="console" onMouseEnter={this.handleMouseEnter} style={{borderRightStyle: 'dashed', borderRightWidth: '1px'}} onClick={this.handleClick} >
              <Icon type={this.state.switchCon ? 'code-o' : 'code'} />
              <b className={this.state.switchCon && 'transparentText'} style={{display: this.state.console ? '' : 'none'}} >{this.state.switchCon ? 'React' : 'Console'}</b>
            </Col>
            <Col span={8} id="IQ" onMouseEnter={this.handleMouseEnter} onClick={this.handleClick} >
              <Icon type={this.state.switchIQ ? 'like-o' : 'dislike'} />
              <b className={this.state.switchIQ && 'transparentText'} style={{display: this.state.IQ ? '' : 'none'}}>{this.state.switchIQ ? 'Foolish' : 'Smart'}</b>
            </Col>
          </Row>
          {this.state.switchCol ? null
           : <Codemirror
             value={this.props.value}
             onChange={(e) => {
               this.props.onChange(e);
               this.state.switchCon && this.setState({
                 consoleCode: e
               });
               this.state.switchIQ && this.setState({
                 smartCode: e
               });
               !this.state.switchIQ && !this.state.switchCon && this.setState({
                 reactCode: e
               });
             }}
             options={{
               mode: 'jsx',
               lineNumbers: true,
               lineWrapping: true,
               smartIndent: true,
               matchBrackets: true,
               theme: 'duotone-light'
             }}
             />}
        </Card>
        <Playground codeText={this.props.value} scope={{React, ReactDom, ...antd, ...fivesix}} es6Console={this.state.switchCon} noRender={!this.state.switchIQ} />
      </div>
    );
  }
}

PlaygroundItem.propTypes = {

};

export default PlaygroundItem;
