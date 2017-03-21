import { push } from 'react-router-redux';
export const UPDATE_COMPONENTS = 'UPDATE_COMPONENTS';

export const refreshComponents = () => (dispatch, getState) => {
    fetch('/api/components').then((res) => {
        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }
        return res.json();
    }).then((ret) => {
        if (ret.errno == 0) {
            const data = ret.data.list;
            const components = {};

            data.forEach((item) => {
                if (!components[item.type]) {
                    components[item.type] = [];
                }
                components[item.type].push(item);
            });

            dispatch({
                type: UPDATE_COMPONENTS,
                components
            });
        }
    });
}
export const removeComponent = (id) => (dispatch, getState) => {
    fetch('/api/component/' + id, {
        method: 'DELETE'
    }).then((res) => {
        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }
        return res.json();
    }).then((ret) => {
        if (ret.errno == 0) {
            dispatch(refreshComponents());
        }
    });
}
export const modifyComponent = (id) => (dispatch, getState) => {
    dispatch(push('/component/' + id));
}
