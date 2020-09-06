import { getJson } from './axios'
import {
    URL_VIDEO_COMMENTS,
    URL_CHILD_COMMENTS,
    URL_ANSWER_COMMENTS,
} from './url'


export function getVideoComments(param) {
    return getJson(URL_VIDEO_COMMENTS, param)
}

export function getChildComments(param) {
    return getJson(URL_CHILD_COMMENTS, param)
}

export function getAnswerComments(param) {
    return getJson(URL_ANSWER_COMMENTS, param)
}