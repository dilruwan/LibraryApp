import actionTypes from '../constants/actionTypes';
import Utility from '../util/utility';
import network from '../resources/network';

export function fetchSession(meta) {
    let session = Utility.createNewModal(meta);
    return dispatch => {
        dispatch({
            type: actionTypes.SESSION_RECEIVED,
            session: session
        });
    }
}

export function createSession(data) {
    return dispatch => {
        return network.request('/session', 'POST', data);
    }
}