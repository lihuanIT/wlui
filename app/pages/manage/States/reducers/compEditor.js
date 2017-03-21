import React from 'react';
import {
    UPDATE_COMPONENT_DATA,
    UPDATE_COMPONENT_PROPERTIES,
    UPDATE_SEARCH_PATHS
} from '../actions/compEditor'
const initialState = {
    compName: '',
    compDetail: {},
    compProps: [],
    searchPaths: []
};

export default function reducer(state = initialState, action) {
    const compDetail = { ...state.compDetail };

    switch (action.type) {
        case UPDATE_COMPONENT_DATA:
            return {
                ...state,
                compDetail: action.compDetail,
                compName: action.compName,
                compProps: action.compProps
            };
            break;
        case UPDATE_COMPONENT_PROPERTIES:
            return {
                ...state,
                compProps: action.props
            };
            break;
        case UPDATE_SEARCH_PATHS:
            return {
                ...state,
                searchPaths: action.paths,
                compDetail: {
                    ...compDetail,
                    // filePath: action.search
                }
            };
            break;
        default:
            return state;
    }
}
