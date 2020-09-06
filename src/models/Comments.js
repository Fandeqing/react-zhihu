import { Author } from './Author'


class Comments {
    constructor(data = {}) {
        Object.assign(this, {
            type: "",
            id: "",
            author: null,
            vote_count: "",
            content: "",
            created_time: "",
            child_comment_count: null,
            child_comments: [],
            reply_to_author: null,

        }, data)

    }
}

function createCommentByVideo(data) {
    const { author: { member }, child_comments = [], child_comment_count } = data;
    return new Comments(
        {
            type: data.type,
            id: data.id,
            vote_count: data.vote_count,
            content: data.content || "",
            created_time: data.created_time,
            child_comment_count: child_comment_count,
            child_comments: child_comments.map(child => createCommentByChild(child)),
            reply_to_author: null,


            author: new Author({
                id: member.id,
                type: member.type,
                name: member.name,
                avatar_url: member.avatar_url,
                headline: member.headline,
            }
            )
        }

    )
}

function createCommentByAnswer(data) {
    const { author: { member }, child_comments = [], child_comment_count } = data;
    return new Comments(
        {
            type: data.type,
            id: data.id,
            vote_count: data.vote_count,
            content: data.content || "",
            created_time: data.created_time,
            child_comment_count: child_comment_count,
            child_comments: child_comments.map(child => createCommentByChild(child)),
            reply_to_author: null,


            author: new Author({
                id: member.id,
                type: member.type,
                name: member.name,
                avatar_url: member.avatar_url,
                headline: member.headline,
            }
            )
        }

    )
}


function createCommentByChild(data) {
    const { author: { member }, reply_to_author: { member: replyMember } } = data;
    return new Comments(
        {
            type: data.type,
            id: data.id,
            vote_count: data.vote_count,
            content: data.content,
            created_time: data.created_time,
            reply_to_author: new Author({
                id: replyMember.id,
                type: replyMember.type,
                name: replyMember.name,
                avatar_url: replyMember.avatar_url,
                headline: replyMember.headline,
            }
            ),


            author: new Author({
                id: member.id,
                type: member.type,
                name: member.name,
                avatar_url: member.avatar_url,
                headline: member.headline,
            }
            )
        }

    )
}



export {
    Comments,
    createCommentByVideo,
    createCommentByAnswer,
    createCommentByChild

}

