import React from 'react';
import {
    UPDATE_COMPONENT_DATA
} from '../actions/compView';

const initialState = {
    component: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_COMPONENT_DATA:
            return {
                ...state,
                component: action.component,
            };
            break;
        default:
            return state;
    }
}
