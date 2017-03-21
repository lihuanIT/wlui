/**
* @Author: Li Shaoyi <laolizi>
* @Date:   2017-01-24T14:33:43+08:00
* @Email:  dllglishaoi@gmail.com
* @Last modified by:   laolizi
* @Last modified time: 2017-02-07T14:53:29+08:00
* @License: MIT
*/



import React from 'react';
import _ from 'lodash';
import {
    EXPORT_TOOL_ADD_LAYOUT,
    EXPORT_TOOL_EDIT_COMPONENT,
    EXPORT_TOOL_CHANGE_DATA_CONFIG,
    EXPORT_TOOL_CHANGE_DELETE_COMPONENT,
    EXPORT_TOOL_CREATE_NODE,
    EXPORT_TOOL_DELETE_NODE,
    EXPORT_TOOL_ADD_CHILD,
    EXPORT_TOOL_REMOVE_CHILD

} from '../actions/exporttool'
const initialState = {
    title:'this is a title',
    layout:[
      //{i: 'a', x: 0, y: 0, w: 3, h: 2},
    ],
    dataConfig:{
        //用来储存用户设置的组件各种属性
    },
    sourceTree:{

    }//布局的原始状态树，用来生成导出代码
};

const node = (state, action) => {
    return {
      ...state,
      childIds: childIds(state.childIds, action)
    }
}

const childIds = (state, action) => {
  switch (action.type) {
    case EXPORT_TOOL_ADD_CHILD:
      return [ ...state, action.childNode.uid ]
    case EXPORT_TOOL_REMOVE_CHILD:
    console.log("action",action);
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}

const getAllDescendantIds = (state, nodeId) => (
  state[nodeId].childIds.reduce((acc, childId) => (
    [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  ), [])
)

const deleteMany = (state, ids) => {
  state = { ...state }
  ids.forEach(id => delete state[id])
  return state
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case EXPORT_TOOL_ADD_LAYOUT:
            return {
                ...state,
                layout:[
                    ...state.layout,
                    {i: `index_${(new Date).getTime()}`, x: 0, y: 0, w: 3, h: 2}
                ]
            };
            break;
        case EXPORT_TOOL_EDIT_COMPONENT:
            let newConfig = {
                ...state.dataConfig
            }
            let _config = {};
            if(!newConfig[action.uid] && action.properties){
                for (var value of action.properties) {
                    try {
                        // console.log(eval(value.description.split('defaultValue:')[1].trim()),"ffff");
                        // _config[value.name] = value.description ? eval(value.description.split('defaultValue:')[1].trim()) : null;
                        _config[value.name] = value.description ? value.description.split('defaultValue:')[1].trim() : null;
                    } catch (e) {
                        console.log("err",e);
                        _config[value.name] = '';
                    } finally {

                    }
                }
                newConfig[action.uid] = _config;
            }

            return {
                ...state,
                editComponent:{
                    uid : action.uid,
                    // pannelType:action.pannelType
                },
                dataConfig:{
                    ...newConfig
                }
            };
            break;
        case EXPORT_TOOL_CHANGE_DATA_CONFIG:
            let newDataConfig = {
                ...state.dataConfig
            }
            let config = newDataConfig[action.uid] || {};
            config[action.key] = action.value;
            newDataConfig[action.uid] = config;
            return {
                ...state,
                dataConfig:{
                    ...newDataConfig
                }
            };
            break;
        case EXPORT_TOOL_CHANGE_DELETE_COMPONENT:
            return {
                ...state
            };
            break;
        case EXPORT_TOOL_CREATE_NODE:
            if(action.node.layout_type){
                //布局节点需要加入flex相关的默认属性
                return {
                    ...state,
                    sourceTree:{
                        ...state.sourceTree,
                        [action.node.uid]: {
                            ...action.node,
                            childIds:[]
                        }
                    },
                    dataConfig:{
                        ...state.dataConfig,
                        [action.node.uid]: {
                            display:"flex"
                        }
                    }
                }
            }else{
                return {
                    ...state,
                    sourceTree:{
                        ...state.sourceTree,
                        [action.node.uid]: {
                            ...action.node,
                            childIds:[]
                        }
                    }
                }
            }

            break;
        case EXPORT_TOOL_ADD_CHILD:
            return {
                ...state,
                sourceTree:{
                    ...state.sourceTree,
                    [action.nodeId]: node(state.sourceTree[action.nodeId],action)
                }
            }
            break;
        case EXPORT_TOOL_REMOVE_CHILD:
            return {
                ...state,
                sourceTree:{
                    ...state.sourceTree,
                    [action.nodeId]: node(state.sourceTree[action.nodeId],action)
                }
            }
            break;
        case EXPORT_TOOL_DELETE_NODE:
            const descendantIds = getAllDescendantIds(state.sourceTree, action.nodeId)
            // console.log("descendantIds",descendantIds);
            return {
                ...state,
                sourceTree:deleteMany(state.sourceTree, [ action.nodeId, ...descendantIds ])
            }
            break;
        default:
            return state;
    }
}
