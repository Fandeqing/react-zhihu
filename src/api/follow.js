import { getJson } from './axios'
import { URL_FOLLOW, URL_MORE_FOLLOW } from './url'


export function getFollow() {
    return getJson(URL_FOLLOW, null)
}

export function getMoreFollow(param) {
    return getJson(URL_MORE_FOLLOW, param)
}

