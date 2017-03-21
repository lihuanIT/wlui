/**
* @Author: Li Shaoyi <laolizi>
* @Date:   2017-01-25T11:14:31+08:00
* @Email:  dllglishaoi@gmail.com
* @Last modified by:   laolizi
* @Last modified time: 2017-02-07T16:23:01+08:00
* @License: MIT
*/



import Handlebars from 'handlebars';
import _ from 'lodash';
const LAYOUT_CODE_MAP = {
    LINEAR_LAYOUT : 'LinearLayout'
}
export const codeGenerator = (templateString,properties)=>{
    var compiled = Handlebars.compile(templateString);
    try {
        const code = compiled(properties);
        return code ;
    } catch (e) {
        return `<div>${e}</div>` ;
    } finally {

    }
}

const createCodeByNode = (node,sourceTree,dataConfig,uid)=>{
    if(_.isArray(node)){
        const ids = node;
        return ids.map((id)=>{
            return createCodeByNode(sourceTree[id],sourceTree,dataConfig,id)
        }).join(" ");
    }

    if(node.layout_type){
        const layout = LAYOUT_CODE_MAP[node.layout_type]
        // return `<${layout}>${createCodeByNode(node.childIds,sourceTree,dataConfig,node.uid)}</${layout}>`
        const style = dataConfig[uid];
        // 布局的配置实际上就是style
        const props = style ? ` style={${JSON.stringify(style)}} ` : '';
        return `<div${props}>${createCodeByNode(node.childIds,sourceTree,dataConfig,node.uid)}</div>`
    }
    if(node.template){
        return codeGenerator(node.template,dataConfig[uid]);
    }
    if(node.samples && node.samples[0]){
        return node.samples[0].sourceCode;
    }
    return '';

}

export const finalCodeGenerator = (sourceTree,dataConfig)=>{
    //首先过滤出最外层的节点（目前都是布局容器节点）
    const rootNodeKeys = _.filter(Object.keys(sourceTree), function(key) { return sourceTree[key].isRootNode; });
    const rootCodeArray = rootNodeKeys.map((key)=>{
        return createCodeByNode(sourceTree[key],sourceTree,dataConfig,key);
    })
    return `<div>${rootCodeArray.join(" ")}</div>`;
}


export const copyToClipboard = (function() {
  var _dataString = null;
  document.addEventListener("copy", function(e){
    if (_dataString !== null) {
      try {
        e.clipboardData.setData("text/plain", _dataString);
        e.preventDefault();
      } finally {
        _dataString = null;
      }
    }
  });
  return function(data) {
    _dataString = data;
    document.execCommand("copy");
  };
})();
