import React, { Component } from 'react'

import { ReportIcon } from "../../components/svg/ReportIcon"
import ThumbUp from "../../components/svg/ThumbUp"
import { ThumbDown } from "../../components/svg/ThumbDown"
import { ReplayIcon } from "../../components/svg/ReplayIcon"


import style from "./comment-item.module.scss"

class CommentItem extends Component {
    render() {
        const { item } = this.props;
        const { author, created_time, content, vote_count, reply_to_author = {} } = item;
        const { avatar_url, name } = author;

        let replayName;
        if (reply_to_author) {
            replayName = reply_to_author.name;
        }

        //时间
        const updatedTime = created_time ? new Date(created_time * 1000) : null
        const updatedTimeRes = updatedTime ? updatedTime.getMonth() + '-' + updatedTime.getDate() : null


        return (
            <div className={style.commentItem}>
                <div className={style.commentMeta}>
                    <span className={style.avator}><img src={avatar_url} alt="avatar" /></span>
                    <span className={style.name}>{name}</span>
                    {reply_to_author ?
                        <span>
                            <span className={style.replay}> 回复 </span>
                            <span className={style.name}>{replayName}</span>
                        </span>
                        : null
                    }
                    <span className={style.editTime}>{updatedTimeRes}</span>
                </div>
                <div className={style.commentWrap}>
                    <div className={style.comment}>
                        <span className={style.fullContent} dangerouslySetInnerHTML={{ __html: content }}></span>
                        {/* <span>{content}</span> */}
                    </div>
                    <div className={style.footer}>
                        <button className={style.btn}>
                            <span className={style.icon}><ThumbUp /></span>
                            {vote_count}
                        </button>
                        <button className={style.btn}>
                            <span className={style.icon}><ReplayIcon /></span>
                            回复
                        </button>
                        <button className={style.btn}>
                            <span className={style.icon}><ThumbDown /></span>
                            踩
                        </button>
                        <button className={style.btn}>
                            <span className={style.icon}><ReportIcon /></span>
                            举报
                        </button>
                    </div>
                </div>
            </div >
        )
    }
}

export default CommentItem;