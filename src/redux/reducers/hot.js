import * as actionsTypes from '../action-types'

const INITIAL_STATE = {
    hotNavList: [],
    hotNavListRec: [],
    hotList: [],
    currentTag: "total"
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case actionsTypes.SET_HOT_LIST:
            return {
                ...state,
                hotNavList: action.payload.data,
                hotNavListRec: action.payload.rec_data
            }
        case actionsTypes.PUT_HOT_LIST:
            return {
                ...state,
            }
        case actionsTypes.SET_HOT_DATA:
            return {
                ...state,
                hotList: action.payload.hotList,
                currentTag: action.payload.currentTag,
            }
        default:
            return state;
    }
}