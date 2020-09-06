import { Author } from './Author'
import { Follower } from './Follower'

class Article {
    constructor(data = {}) {
        Object.assign(this, {
            type: "",
            id: "",
            title: "",
            thumbnail: "",
            excerpt: "",
            content: "",
            comment_count: "",
            vote_count: "",
            author: null,
            updated_time: "",
            followers: [],
        }, data)

    }
}

function createArticleByRecommend(data) {
    return new Article(
        {
            id: data.id,
            type: data.type,
            title: data.title,
            thumbnail: data.thumbnail,
            excerpt: data.excerpt,
            content: data.content,
            comment_count: data.comment_count,
            voteup_count: data.voteup_count || data.vote_count,

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
            // question: new Question({
            //     id: data.question.id || "",
            //     title: data.question.title
            // }
            // )
        }


    )
}


function createArticleByFollow(data) {
    const { target, actors } = data;
    const { author } = target;
    return new Article(
        {
            id: target.id,
            type: target.type,
            title: target.title,
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
    Article,
    createArticleByRecommend,
    createArticleByFollow
}

