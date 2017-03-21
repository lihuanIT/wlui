require('es6-promise').polyfill();
require('isomorphic-fetch');
import { replace, push } from 'react-router-redux';
import { refreshComponents } from './compList';
import querystring from 'querystring';

let searchPathTimer;

export const UPDATE_COMPONENT_DATA = 'UPDATE_COMPONENT_DATA';
export const UPDATE_COMPONENT_PROPERTIES = 'UPDATE_COMPONENT_PROPERTIES';
export const UPDATE_SEARCH_PATHS = 'UPDATE_SEARCH_PATHS';

export const refreshComponentDetail = (id) => (dispatch, getState) => {
    if (id !== 'new') {
        window.Loading && window.Loading.show();

        fetch(`/api/componentforview/${id}`).then((res) => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        }).then((ret) => {
            if (ret.errno == 0) {
                window.Loading && window.Loading.hide();

                if (ret.data) {
                    dispatch({
                        type: UPDATE_COMPONENT_DATA,
                        compDetail: ret.data,
                        compName: ret.data.name,
                        compProps: ret.properties
                    });
                }
            }
        });
    }
    dispatch({
        type: UPDATE_COMPONENT_DATA,
        compDetail: {},
        compName: '',
    });
}

export const searchCompPath = (keyword) => (dispatch, getState) => {
    if (searchPathTimer) {
        clearTimeout(searchPathTimer);
        searchPathTimer = null;
    }

    function fake() {
        const str = querystring.encode({ keyword });

        fetch(`/api/componentfiles?${str}`)
            .then(res => res.json())
            .then((ret) => {
                if (ret.errno == 0) {
                    const result = ret.paths;
                    const data = [];
                    result.forEach((r) => {
                        data.push({
                            value: r,
                            text: r,
                        });
                    });
                    dispatch({
                        type: UPDATE_SEARCH_PATHS,
                        search: keyword,
                        paths: data
                    });
                    dispatch(refreshProperties(keyword));
                }
            });
    }

    searchPathTimer = setTimeout(fake, 300);
}

export const refreshProperties = (path) => (dispatch, getState) => {
    const str = querystring.encode({ path });

    fetch(`/api/doc?${str}`).then((res) => {
        return res.json();
    }).then((ret) => {
        if (ret.errno == 0) {
            dispatch({
                type: UPDATE_COMPONENT_PROPERTIES,
                props: ret.properties
            });
        }
    });
}

export const saveComponent = (data) => (dispatch, getState) => {
    let url = '/api/component';
    let method = 'POST';
    if (data._id) {
        url += '/' + data._id;
        method = 'PUT';
    }
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function (ret) {
        dispatch(refreshComponents());
        dispatch(push('/'));
    });
}

export const backToCompList = () => (dispatch, getState) => {
    dispatch(refreshComponents());
    dispatch(push('/'));
}

export const saveSample = (data) => (dispatch, getState) => {
    const method = data.id ? 'PUT' : 'POST';

    fetch(`/api/sample${data.id ? '/' + data.id : ''}`, {
        method: data.id ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        if (res.status >= 400) {
            callback && callback(new Error("Bad response from server"), null);
        }
        return res.json();
    }).then(function (stories) {
        dispatch(refreshComponentDetail());
    });
}
