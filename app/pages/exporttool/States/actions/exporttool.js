require('es6-promise').polyfill();
require('isomorphic-fetch');
export const EXPORT_TOOL_ADD_LAYOUT = 'EXPORT_TOOL_ADD_LAYOUT';
export const EXPORT_TOOL_EDIT_COMPONENT = 'EXPORT_TOOL_EDIT_COMPONENT';
export const EXPORT_TOOL_CHANGE_DATA_CONFIG = 'EXPORT_TOOL_CHANGE_DATA_CONFIG';
export const EXPORT_TOOL_CHANGE_DELETE_COMPONENT = 'EXPORT_TOOL_CHANGE_DELETE_COMPONENT';

export const EXPORT_TOOL_CREATE_NODE = 'EXPORT_TOOL_CREATE_NODE'
export const EXPORT_TOOL_DELETE_NODE = 'EXPORT_TOOL_DELETE_NODE'
export const EXPORT_TOOL_ADD_CHILD = 'EXPORT_TOOL_ADD_CHILD'
export const EXPORT_TOOL_REMOVE_CHILD = 'EXPORT_TOOL_REMOVE_CHILD'
import { finalCodeGenerator,copyToClipboard } from 'utils/pandorasBox'
import { message, Button } from 'antd';

export const addLayout = () => {
    return { type: EXPORT_TOOL_ADD_LAYOUT };
}


const childIds = (state, action) => {
  switch (action.type) {
    case EXPORT_TOOL_ADD_CHILD:
      return [ ...state, action.childId ]
    case EXPORT_TOOL_REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}

const node = (state, action) => {
  switch (action.type) {
    case EXPORT_TOOL_CREATE_NODE:
      return {
        id: action.nodeId,
        counter: 0,
        childIds: []
      }
    case EXPORT_TOOL_ADD_CHILD:
    case EXPORT_TOOL_REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      }
    default:
      return state
  }
}

export const editProps = (uid,filePath) => (dispatch, getState) =>{
    if(filePath && !getState().exporttool.dataConfig[uid]){
        fetch(`/api/doc?path=${filePath}`)
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(function(ret) {
            dispatch({ type: EXPORT_TOOL_EDIT_COMPONENT , uid ,properties:ret.properties});
        });
    }else{
        dispatch( { type: EXPORT_TOOL_EDIT_COMPONENT , uid });
    }

}


export const changeConfig = (uid,key,value) => {
    return { type: EXPORT_TOOL_CHANGE_DATA_CONFIG , uid,key,value};
}

export const deleteComp = (uid) => {
    return { type: EXPORT_TOOL_CHANGE_DELETE_COMPONENT , uid};
}

export const exportCode = () => (dispatch, getState) => {
    const finalCode = finalCodeGenerator(getState().exporttool.sourceTree,getState().exporttool.dataConfig);
    console.log(finalCode);
    copyToClipboard(finalCode);
    message.success('已复制到粘贴板');

    dispatch({ type: "导出代码吧，骚年" });
}


export const createNode = (node) => ({
  type: EXPORT_TOOL_CREATE_NODE,
  node: node
})

export const deleteNode = (nodeId) => ({
  type: EXPORT_TOOL_DELETE_NODE,
  nodeId
})

export const addChild = (nodeId, childNode) => ({
  type: EXPORT_TOOL_ADD_CHILD,
  nodeId,
  childNode
})

export const removeChild = (childId) => (dispatch, getState) =>{
    const node = getState().exporttool.sourceTree[childId];
    if(node.parentId){
        dispatch({
          type: EXPORT_TOOL_REMOVE_CHILD,
          nodeId:node.parentId,
          childId
        })
    }

}
