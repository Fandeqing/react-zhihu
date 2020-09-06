
class Author {
    constructor(data = {}) {
        Object.assign(this, {
            type: "",
            id: "",
            name: "",
            avatar: "",
            headline: "",
            followers_count: "",
            is_followed: "",
            is_following: ""
        }, data)
    }
}

export {
    Author
}

