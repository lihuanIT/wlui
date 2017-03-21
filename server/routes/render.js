import { match } from 'react-router'
import Router from 'koa-router'
import renderCtrl from '../controllers/serverRenderCtrl'
import routes from '../../app/routes'

const router = new Router({ prefix: '/wlui' })
import config from '../../common/config'

function _match (location) {
    return new Promise((resolve, reject) => {
        match(location, (error, redirectLocation, renderProps) => {
            if (error) {
                return reject(error)
            }
                resolve({redirectLocation, renderProps})
        })
    })
}

router.get('/:pagename/:subpage?', async (ctx, next) => {
    console.log("ctx.params.",ctx.params)
    try {
        if (!config.pages[ctx.params.pagename]) {
            return await ctx.render('404')
        }
        const { redirectLocation, renderProps } = await _match({ routes, location: ctx.url })
        if (redirectLocation) {
            ctx.redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            await renderCtrl(ctx, next, renderProps)
        } else {
            await next()
        }
    } catch (e) {
        console.error('Server-Render Error Occurs: %s', e.stack)
        await ctx.render('500', {
            msg: ctx.app.env === 'development' ? e.message : false
        })
    }
})

export default router
