import combineRouters from 'koa-combine-routers'
import renderRouter from './render'
import apiRouter from './api'

const router = combineRouters([
    renderRouter,
    apiRouter
])

export default router
