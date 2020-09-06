import { getJson, putJson } from './axios'
import {
    URL_HOT_NAV_LIST,
    URL_HOT_ITEMS
} from './url'


export function getHotNavList(param) {
    return getJson(URL_HOT_NAV_LIST, param)
}

export function getHotItems(param) {
    return getJson(URL_HOT_ITEMS, param)
}

export function putHotNavList(param) {
    return putJson(URL_HOT_NAV_LIST, param)
}