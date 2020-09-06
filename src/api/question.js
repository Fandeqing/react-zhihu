import { getJson } from './axios'
import {
    URL_QUESTION,
    URL_QUESTION_ANSWERS,
    URL_SINGLE_ANSWER
} from './url'


export function getQuestionInfo(param) {
    return getJson(URL_QUESTION, param)
}

export function getQuestionAnswers(param) {
    return getJson(URL_QUESTION_ANSWERS, param)
}

export function getSingleAnswer(param) {
    return getJson(URL_SINGLE_ANSWER, param)
}