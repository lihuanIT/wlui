import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'
const middleware = routerMiddleware(hashHistory)
const finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(middleware),
    !(typeof window === 'undefined') && window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const initialState = {}

export default function storeFactory() {

    return (rootReducer) => {

        const store = finalCreateStore(rootReducer, initialState)

        return store
    }
}
