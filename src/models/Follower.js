

class Follower {

    constructor(data = {}) {
        Object.assign(this, {
            id: "",
            action_text_tpl: "",
            updated_time: "",
            name: "",
            headline: "",
            type: "",
            url: "",
            avatar_url: "",
        }, data)
    }

}

export { Follower }