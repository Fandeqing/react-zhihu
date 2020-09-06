import React, { Component } from 'react'

import AnswerDetail from '../../../../components/answer-detail/AnswerDetail'
import AuthorInfo from '../../../../components/author-info/AuthorInfo'
import ContentActions from '../../../../components/content-actions/ContentActions'
import { tranNum } from '../../../../utils/tranNum'
import ArrowDown from '../../../../components/svg/ArrowDown'
import Comment from '../../components/comment/Comment'

import style from './answer-item.module.scss'


class AnswerItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fullContent: true,
            titleBottom: null,
            showComment: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.getTitleHeight)
        this.setState({ fullContent: this.fullContent })
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

    handleComment = e => {
        this.setState({
            showComment: !this.state.showComment
        })
    }

    render() {

        const { type, id, excerpt,
            author, comment_count, voteup_count, content, updated_time
        } = this.props.item;

        const { fullContent } = this.props
        this.fullContent = fullContent;
        //编辑日期
        const updatedTime = updated_time ? new Date(updated_time) : null
        const updatedTimeRes = updatedTime ? updatedTime.getMonth() + '-' + updatedTime.getDate() : null

        const answerDataDetail = {
            type,
            author,
            voteupCount: tranNum(voteup_count, 1),
            content,
            updatedTime: updatedTimeRes
        }
        let contentActionsData = {
            showComment: this.state.showComment,
            titleBottom: this.state.titleBottom,
            showCollapseIcon: this.state.fullContent,
            voteNum: voteup_count,//tranNum(voteup_count, 1), 
            commentNum: tranNum(comment_count, 1)
        }

        //回答操作栏
        let contentActions;
        // 根据返回的答案有无简介字段返回不同的样式。
        if (excerpt) {
            contentActions = <ContentActions handleComment={e => this.handleComment()} contentActionsData={contentActionsData} closeFullContent={e => this.closeFullContent()} />
        } else {
            contentActionsData.showCollapseIcon = false;
            contentActions = <ContentActions handleComment={e => this.handleComment()} contentActionsData={contentActionsData} />
        }

        const itemInfo = {
            type,
            id,
            fullContent: this.state.fullContent
        }

        return (

            <div className={style.card}>
                {/* 头部标记 */}
                <div ref={ref => this.titleRef = ref}></div>
                {/* 回答 */}
                <div className={style.answerItem}>
                    {
                        // 根据返回的答案有无简介字段返回不同的样式。
                        excerpt ? (
                            <div onClick={e => this.showFullContent()}>
                                <div className={`${this.state.fullContent ? null : style.answerBrief}`}>
                                    <div>
                                        <AuthorInfo author={author} />
                                        <AnswerDetail answerDataDetail={answerDataDetail} />
                                    </div>
                                </div>
                                <button className={this.state.fullContent ? style.btnHidden : style.btn}>
                                    展开阅读全文 <span>​​​​<ArrowDown /></span></button>
                            </div>
                        ) : (
                                <AnswerDetail answerDataDetail={answerDataDetail} />
                            )
                    }
                    {/* 回答点赞评论栏 */}
                    <div className={style.contentActions}>
                        {contentActions}
                    </div>
                    {
                        this.state.showComment ? (
                            <Comment itemInfo={itemInfo} handleComment={e => this.handleComment()} />
                        ) : null
                    }
                </div>
            </div>
        )
    }
}

export default AnswerItem;

