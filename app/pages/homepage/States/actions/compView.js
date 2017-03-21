export const UPDATE_COMPONENT_DATA = 'UPDATE_COMPONENT_DATA';

export const getComponentData = (id) => (dispatch, getState) => {
    window.Loading && window.Loading.show();
    fetch(`/api/componentforview/${id}`)
        .then((res) => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        })
        .then((ret) => {
            if (ret.errno == 0) {
                window.Loading && window.Loading.hide();

                if (ret.data) {
                    dispatch({ type: UPDATE_COMPONENT_DATA, component: { ...ret.data, properties: ret.properties } })
                }
            }
        });
}
