import actionTypes from '../constants/actionTypes'

let initialState = {
    session: {}
}

export default (state = initialState, action) => {
    let updated = Object.assign({}, state);

    switch(action.type) {
        case actionTypes.SESSION_RECEIVED:
            updated['session'] = action.session;
            return updated;

        default:
            return state;
    }
}