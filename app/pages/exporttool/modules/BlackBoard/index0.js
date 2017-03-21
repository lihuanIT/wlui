/**
* @Author: Li Shaoyi <laolizi>
* @Date:   2017-02-04T16:06:47+08:00
* @Email:  dllglishaoi@gmail.com
* @Last modified by:   laolizi
* @Last modified time: 2017-02-07T12:07:16+08:00
* @License: MIT
*/

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DropTarget } from 'react-dnd';
import LaoliziPreview from 'comp/LaoliziPreview'
import CONSTANTS from 'utils/constants'
import Radium from 'radium';
import LinearLayout from '../LinearLayout';
import uuidV4 from 'uuid/v4';

const styles={
    container : {
        background:'#EFF1E1',
        width:'100%',
        height:'100%',
        overflow:'hidden',
        maxWidth:'100%',
        border:"1px dashed #676767"
    }
};

const squareTarget = {
  drop(props,monitor,component) {
      if(monitor.isOver() && monitor.isOver({ shallow: false })){
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
            layouts : []
        }
        this.addItem = this.addItem.bind(this);
	}
    addItem(component){
        this.setState({
            layouts:[...this.state.layouts,component]
        })
    }

    deleteComp(uid){
        console.log(this.state.layouts);
        // deleteComp
        this.setState({
            layouts:_.filter(this.state.layouts,(item,index)=> {
                return item.uid != uid;
            })
        })
    }

	render() {
        const { connectDropTarget, isOver,editComponent,dataConfig } = this.props;
        const layouts = this.state.layouts;
        const deleteComp = this.deleteComp.bind(this);
        console.log("layouts",layouts);
		return connectDropTarget(
            <div style={styles.container}>
                {
                    layouts.map((component,index)=>{
                        const MyLayout = component.layout;
                        return <MyLayout compUid={component.uid} deleteComp={deleteComp} key={index} dataConfig={dataConfig} editComponent={editComponent} />
                    })
                }
            </div>
        )
	}
}
