import { getJson } from './axios'
import {
    URL_ZVIDEO,
    URL_ZVIDEO_RECOMMEND,
    URL_MORE_ZVIDEO_RECOMMEND
} from './url'


export function getZvideo(param) {
    return getJson(URL_ZVIDEO, param)
}

export function getZvideoRecommend(param) {
    return getJson(URL_ZVIDEO_RECOMMEND, param)
}

export function getMoreZvideoRecommend(param) {
    return getJson(URL_MORE_ZVIDEO_RECOMMEND, param)
}