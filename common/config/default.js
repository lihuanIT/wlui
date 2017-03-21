import path from 'path'

const rootPath = path.join(__dirname, '../..')
export default {
    title: "物流前端组件",
    rootPath,
    publicPath: '/public',
    staticPath: '/public/static',
    port: 8964,
    dbconf: {
        user: 'admin',
        pwd: 'wuliu123',
        database: 'wlui'
    },
    pages: {
        homepage: {

        },
        manage: {

        },
        exporttool: {

        }
    },
    //
    skipComponentsWithoutExample: false,
    defaultExample: false,
    showCode: false,
    assetsDir: null,
    highlightTheme: 'base16-light',
    previewDelay: 500,
    verbose: false,

}
