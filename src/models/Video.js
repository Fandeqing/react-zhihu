import { Author } from './Author'
import { Follower } from './Follower'

class Video {
    constructor(data = {}) {
        Object.assign(this, {
            type: "",
            id: "",
            title: "",
            thumbnail: "",
            excerpt: "",
            video_id: "",
            content: "",
            comment_count: "",
            vote_count: "",
            updated_time: "",
            followers: [],
            playlist: [],
            cover_url: "",
            play_count: 0,
            duration: 0,
            author: null,
        }, data)

    }
}

function createVideoByRecommend(data) {

    return new Video(
        {
            id: data.id,
            type: data.type,
            title: data.title,
            thumbnail: data.thumbnail_extra_info.url,
            video_url: data.thumbnail_extra_info.video_id,
            excerpt: data.description,
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
        }

    )
}

function createVideoByFollow(data) {
    const { target, actors } = data;
    const { author } = target;
    return new Video(
        {
            id: target.id,
            type: target.type,
            title: target.title,
            thumbnail: target.thumbnail,
            video_url: data.thumbnail_extra_info.video_id,
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

function createVideoByZvideo(data) {
    return new Video(
        {
            title: data.title,
            playlist: data.playlist,
            cover_url: data.cover_url,
        })
}


function createVideoByZvideoRec(data) {

    return new Video(
        {
            id: data.id,
            type: data.type,
            title: data.title,
            thumbnail: data.image_url,
            excerpt: data.description,
            play_count: data.play_count,
            duration: data.video.duration,
            video_id: data.video.video_id,

            author: new Author({
                id: data.author.id,
                type: data.author.type,
                name: data.author.name,
                avatar_url: data.author.avatar_url
            }
            ),
        }

    )
}

export {
    Video,
    createVideoByRecommend,
    createVideoByFollow,
    createVideoByZvideo,
    createVideoByZvideoRec
}

