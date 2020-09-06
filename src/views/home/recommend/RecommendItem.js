import React, { Component } from 'react'

import AnswerDescription from '../../../components/answer-brief/AnswerDescription'
import AnswerDetail from '../../../components/answer-detail/AnswerDetail'
import AuthorInfo from '../../../components/author-info/AuthorInfo'
import ContentActions from '../../../components/content-actions/ContentActions'
import { tranNum } from '../../../utils/tranNum'
import Comment from '../components/comment/Comment'

import style from './recommend-item.module.scss'


class RecommendItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fullContent: false,
            titleBottom: null,
            showComment: false,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.getTitleHeight)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.getTitleHeight);
    }


    getTitleHeight = () => {
        const titleDom = this.titleRef;
        const bottom = titleDom.getBoundingClientRect().bottom;
        this.setState({ titleBottom: bottom })
    }


    showFullContent() {
        this.setState({ fullContent: true })
    }
    closeFullContent() {
        this.setState({ fullContent: false })
    }

    handleComment = () => {
        this.setState({
            showComment: !this.state.showComment
        })
    }

    render() {

        const { id, type, title, question = null, video_url = null, thumbnail, excerpt = "",
            author, comment_count, voteup_count, content, updated_time
        } = this.props.item;
        const titleRes = title || question.title;
        const { name: authorName } = author;
        //编辑日期
        const updatedTime = updated_time ? new Date(updated_time * 1000) : null
        const updatedTimeRes = updatedTime ? updatedTime.getMonth() + '-' + updatedTime.getDate() : null

        const excerptSubstr = thumbnail ?
            `${authorName}: ${excerpt.substr(0, 90)}...` :
            `${authorName}: ${excerpt.substr(0, 70)}...`; //空格无效？？？

        const answerData = { thumbnail, excerptSubstr }

        const answerDataDetail = {
            type,
            author,
            voteupCount: tranNum(voteup_count, 1),
            content,
            updatedTime: updatedTimeRes
        }
        const contentActionsData = {
            titleBottom: this.state.titleBottom,
            showCollapseIcon: this.state.fullContent,
            showComment: this.state.showComment,
            voteNum: voteup_count,
            commentNum: tranNum(comment_count, 1),
            itemId: id
        }
        const itemInfo = {
            type,
            id
        }

        return (
            <div className={style.card}>
                {type === 'answer' ? (
                    <h2 className={style.title} ref={ref => this.titleRef = ref}><a target="_blank" href={`/question/${question.id}/answer/${id}`} rel="noopener noreferrer">{titleRes}</a></h2>
                ) : (<h2 style={{ color: 'red' }} className={style.title} ref={ref => this.titleRef = ref}><a target="_blank" href={`/zvideo/${id}?video_id=${video_url}`} rel="noopener noreferrer">{titleRes}</a></h2>
                    )}
                {/* 是否展开全文 */}
                {!this.state.fullContent ? (
                    <div>
                        <AnswerDescription answerData={answerData} showFullContent={e => this.showFullContent()} />
                    </div>) :
                    (<div>
                        <AuthorInfo author={author} />
                        <AnswerDetail answerDataDetail={answerDataDetail} />
                    </div>)}
                {/* 回答点赞评论栏 */}
                <ContentActions contentActionsData={contentActionsData}
                    handleComment={e => this.handleComment()}
                    closeFullContent={e => this.closeFullContent()} />
                {
                    this.state.showComment ? (
                        <Comment itemInfo={itemInfo} handleComment={e => this.handleComment()} />
                    ) : null
                }
            </div>
        )
    }
}

export default RecommendItem;