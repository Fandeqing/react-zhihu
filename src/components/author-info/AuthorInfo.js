import React, { Component } from 'react'

import style from './author-info.module.scss'

class AuthorInfo extends Component {
    render() {
        const { author } = this.props;

        return (
            <div className={style.author}>
                <img className={style.avator} src={author.avatar_url} alt="avatar" />
                <span className={style.authorName}>{author.name}</span>
                <span className={style.authorHeadline}>{`, ${author.headline}`}</span>
            </div>
        )
    }
}

export default AuthorInfo;