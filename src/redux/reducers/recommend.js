import * as actionsTypes from '../action-types'

const INITIAL_STATE = {

    recommendList: [],
    nextRecUrl: ""

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionsTypes.SET_REOMMEND:
            return {
                ...state,
                recommendList: action.payload.recommendList,
                nextRecUrl: action.payload.nextRecUrl
            }
        case actionsTypes.SET_MORE_REOMMEND:
            return {
                ...state,
                recommendList: state.recommendList.concat(action.payload.recommendList),
                nextRecUrl: action.payload.nextRecUrl
            }
        default:
            return state;
    }
}