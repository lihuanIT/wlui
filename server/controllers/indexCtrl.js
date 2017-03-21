import WltestModel from '../models/wltest'
import dirTree from 'directory-tree'
var path = require('path')
var ROOT_PATH = path.resolve(process.env.PWD,'app/components')
let tree = dirTree(ROOT_PATH);
export default async (ctx, next) => {
    let doc = await WltestModel.findOne({});
    ctx.body = {
        wltest:doc,
        tree:tree,
        status: 0,
        info: 'this is a demo api with path /api~~'
    }
}
