import WltestModel from '../models/wltest';
import Component from '../models/Component';
import Sample from '../models/Sample';
import dirTree from 'directory-tree';

import doctrine from 'doctrine';
const jsdoc = require('jsdoc-api')
const path = require('path');
const fs = require('fs');
const COMP_ROOT_PATH = path.resolve(process.cwd(), './node_modules/fivesix');


// 获取路径数组
const getPaths = (tree) => {
    let paths = [];

    tree.path && tree.path.match(/\.(js|jsx)$/i) && paths.push(tree.path.replace(COMP_ROOT_PATH, 'fivesix'));
    tree.children && tree.children.map(item => {
        paths = paths.concat(getPaths(item));
    })

    return paths;
}

// 读取文件属性信息
const getFileProperties = (relativePath) => {
    const filepath = path.resolve(COMP_ROOT_PATH, '../' + relativePath);
    const source = fs.readFileSync(filepath, 'utf8') + '';
    const jsDoc = jsdoc.explainSync({ source }).filter(doc => doc.properties);

    const properties = jsDoc.length ? jsDoc[0].properties : [];

    return properties;
}


// 获取所有组件列表
export const getComponents = async (ctx, next) => {
    const list = await Component.find({ isRemoved: false });
    ctx.body = {
        data: { list },
        errno: 0,
        errmsg: '',
    }
};

// 根据ID查询组件
export const getComponent = async (ctx, next) => {
    const data = await Component.findOne({ _id: ctx.params.id, isRemoved: false }).populate({ path: 'samples' });
    ctx.body = {
        data,
        errno: 0,
        errmsg: '',
    }
};

// 根据ID查询组件（包含属性列表）
export const getComponentForView = async (ctx, next) => {
    const data = await Component.findOne({ _id: ctx.params.id, isRemoved: false }).populate({ path: 'samples' });
    let properties;

    try {
        properties = getFileProperties(data.filePath);
    } catch (e) {
        console.log("getComponentForView", e);
    } finally {
        ctx.body = {
            data,
            properties,
            errno: 0,
            errmsg: '',
        }
    }
};

// 保存组件
export const saveComponent = async (ctx, next) => {
    let component = null;
    if (ctx.params.id) {
        component = await Component.findOne({ _id: ctx.params.id });
    } else {
        component = new Component();
    }
    component.set(ctx.request.body);
    await component.save();
    ctx.body = {
        data: component,
        errno: 0,
        errmsg: '',
    }
};

// 删除对应组件
export const deleteComponent = async (ctx, next) => {
    await Component.findOneAndUpdate({ _id: ctx.params.id }, { isRemoved: true });

    ctx.body = {
        errno: 0,
        errmsg: '',
    }
};

// 根据关键词查询组件文件路径列表
export const getComponentFiles = async (ctx, next) => {
    const reg = new RegExp(ctx.query.keyword.toLowerCase());
    const tree = dirTree(path.join(COMP_ROOT_PATH, 'lib'), ['.js', '.jsx']);
    const paths = getPaths(tree).filter(item => item.toLowerCase().match(reg));

    ctx.body = {
        paths: paths.slice(0, 10),
        errno: 0,
        errmsg: '',
    }
};

//根据ID获取组件的示例列表
export const getSamplesById = async (ctx, next) => {
    const list = await Sample.find({ _id: ctx.params.id });

    ctx.body = {
        data: { list },
        errno: 0,
        errmsg: '',
    }
};

// 保存组件示例
export const saveSample = async (ctx, next) => {
    let sample = ctx.params.id ? await Sample.findOne({ _id: ctx.params.id }) : new Sample();

    sample.set(ctx.request.body);

    await sample.save();
    ctx.body = {
        data: sample,
        errno: 0,
        errmsg: '',
    }
};

//删除组件示例
export const deleteSample = async (ctx, next) => {
    await Sample.remove({ _id: ctx.params.id });

    ctx.body = {
        errno: 0,
        errmsg: '',
    }
};

// 获得文件文档信息
export const getPropertiesDoc = async (ctx, next) => {
    const filePath = ctx.query.path;
    let properties;

    try {
        properties = getFileProperties(filePath);

        ctx.body = {
            properties,
            path: filePath,
            errno: 0,
            errmsg: '',
        }
    } catch (e) {
        ctx.body = {
            properties: [],
            path: filePath,
            errno: 0,
            errmsg: '',
        }
    }

}
