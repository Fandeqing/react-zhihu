import { Author } from './Author'
import { Question } from './Question'
import { Follower } from './Follower'

class Answer {
    constructor(data = {}) {
        Object.assign(this, {
            type: "",
            id: "",
            thumbnail: "",
            excerpt: "",
            updated_time: "",
            content: "",
            comment_count: "",
            vote_count: "",
            author: null,
            question: null,
            followers: [],
        }, data)

    }
}

function createAnswerByRecommend(data) {

    return new Answer(
        {
            id: data.id,
            type: data.type,
            thumbnail: data.thumbnail,
            excerpt: data.excerpt_new,
            content: data.content,
            comment_count: data.comment_count,
            voteup_count: data.voteup_count || data.vote_count,
            updated_time: data.updated_time,

            author: new Author({
                id: data.author.id,
                type: data.author.type,
                name: data.author.name,
                avatar_url: data.author.avatar_url,
                headline: data.author.headline,
                followers_count: data.author.followers_count,
                is_followed: data.author.is_followed,
                is_following: data.author.is_following,
            }
            ),
            question:
                new Question({
                    id: data.question.id,
                    title: data.question.title
                }
                )
        }

    )
}

function createAnswerByQuestion(data) {
    return new Answer(
        {
            id: data.id,
            type: data.type,
            // thumbnail: data.thumbnail,
            excerpt: data.excerpt,
            content: data.content,
            comment_count: data.comment_count,
            voteup_count: data.voteup_count || data.vote_count,
            updated_time: data.updated_time,

            author: new Author({
                id: data.author.id,
                type: data.author.type,
                name: data.author.name,
                avatar_url: data.author.avatar_url,
                headline: data.author.headline,
                followers_count: data.author.followers_count,
                is_followed: data.author.is_followed,
                is_following: data.author.is_following,
            }
            ),
            question:
                new Question({
                    id: data.question.id,
                    title: data.question.title
                }
                )
        }

    )
}

function createAnswerByFollow(data) {
    const { target, actors } = data;
    const { author, question } = target;
    return new Answer(
        {
            id: target.id,
            type: target.type,
            thumbnail: target.thumbnail,
            excerpt: target.excerpt,
            content: target.content,
            comment_count: target.comment_count,
            voteup_count: target.voteup_count || target.vote_count,
            updated_time: target.updated_time,

            author: new Author({
                id: author.id,
                type: author.type,
                name: author.name,
                avatar_url: author.avatar_url,
                headline: author.headline,
                followers_count: author.followers_count,
                is_followed: author.is_followed,
                is_following: author.is_following,
            }
            ),
            question:
                new Question({
                    id: question.id,
                    title: question.title
                }
                ),
            followers: [...actors.map(actor => (
                new Follower({
                    id: actor.id,
                    action_text_tpl: data.action_text_tpl,
                    updated_time: data.updated_time,
                    name: actor.name,
                    headline: actor.headline,
                    type: actor.type,
                    url: actor.url,
                    avatar_url: actor.avatar_url,
                })
            )
            )]

        }

    )
}

export {
    Answer,
    createAnswerByRecommend,
    createAnswerByQuestion,
    createAnswerByFollow
}

