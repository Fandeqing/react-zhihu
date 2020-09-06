import { getJson } from './axios'
import { URL_RECOMMEND, URL_MORE_RECOMMEND } from './url'


export function getRecommend() {
    return getJson(URL_RECOMMEND, null)
}

export function getMoreRec(param) {
    return getJson(URL_MORE_RECOMMEND, param)
}