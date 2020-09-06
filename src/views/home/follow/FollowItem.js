import React, { Component } from 'react'

import AnswerDescription from '../../../components/answer-brief/AnswerDescription'
import AnswerDetail from '../../../components/answer-detail/AnswerDetail'
import AuthorInfo from '../../../components/author-info/AuthorInfo'
import ContentActions from '../../../components/content-actions/ContentActions'
import { tranNum } from '../../../utils/tranNum'
import Comment from '../components/comment/Comment'

import style from './follow-item.module.scss'


class FollowItem extends Component {

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
    //关注者更新时间
    calcTimeDif = (d1) => {
        const dateBegin = new Date(d1)
        const dateEnd = new Date()

        const dateDiff = dateEnd.getTime() - dateBegin.getTime() //dateBegin.getTime();//时间差的毫秒数
        const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
        const leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        const hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
        //计算相差分钟数
        const leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
        const minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数

        const diffRes = dayDiff > 0 ? `${dayDiff} 天前` : (hours > 0 ? `${hours} 小时前` : `${minutes} 分钟前`)
        return diffRes;
    }

    handleComment = () => {
        this.setState({
            showComment: !this.state.showComment
        })
    }


    render() {

        const { id, type, title, question, thumbnail, video_url = null, excerpt,
            author, comment_count, voteup_count, content, updated_time,
            followers,
        } = this.props.item;
        const titleRes = title || question.title;
        const { name: authorName } = author;
        const follower = followers[0]
        const { action_text_tpl, name } = follower;


        //关注者更新时间
        const followUpdateTime = this.calcTimeDif(follower.updated_time * 1000)
        //内容更新日期
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
            voteNum: voteup_count,//tranNum(voteup_count, 1),
            commentNum: tranNum(comment_count, 1),
            showComment: this.state.showComment
        }

        let resItem;
        if (type === 'answer') {
            resItem = (
                <div>
                    <div className={style.authorInfo}>
                        <AuthorInfo author={author} />
                    </div>
                    <h2 className={style.title} ref={ref => this.titleRef = ref}><a target="_blank" href={`/question/${question.id}/answer/${id}`} rel="noopener noreferrer">{titleRes}</a></h2>
                    {/* 是否展开全文 */}
                    {
                        !this.state.fullContent ? (
                            <div >
                                <AnswerDescription answerData={answerData} showFullContent={e => this.showFullContent()} />
                            </div>) : (
                                <AnswerDetail answerDataDetail={answerDataDetail} />
                            )
                    }
                    {/* 回答点赞评论栏 */}
                    <ContentActions contentActionsData={contentActionsData} handleComment={e => this.handleComment()} closeFullContent={e => this.closeFullContent()} />
                </div >
            )
        }
        // else if (type === "article") {
        //     resItem = (
        //         <div>
        //             <h2 className={style.title} ref={ref => this.titleRef = ref}><a href="#">{titleRes}</a></h2>
        //             {/* 是否展开全文 */}
        //             {!this.state.fullContent ? (
        //                 <div >
        //                     <AnswerDescription answerData={answerData} showFullContent={e => this.showFullContent()} />
        //                 </div>) : (
        //                     <div>
        //                         <AnswerDetail answerDataDetail={answerDataDetail} />
        //                     </div>
        //                 )}
        //             {/* 回答点赞评论栏 */}
        //             <ContentActions contentActionsData={contentActionsData} handleComment={e => this.handleComment()} closeFullContent={e => this.closeFullContent()} />
        //         </div>
        //     )
        // }
        else if (type === "zvideo") {
            resItem = (
                <div>
                    <h2 style={{ color: 'red' }} className={style.title} ref={ref => this.titleRef = ref}><a target="_blank" href={`/zvideo/${id}?video_id=${video_url}`} rel="noopener noreferrer">{titleRes}</a></h2>
                    {/* <h2 className={style.title} ref={ref => this.titleRef = ref}><a href="#">{titleRes}</a></h2> */}
                    {/* 是否展开全文 */}
                    {!this.state.fullContent ? (
                        <div >
                            <AnswerDescription answerData={answerData} showFullContent={e => this.showFullContent()} />
                        </div>) : (
                            <div>
                                <AuthorInfo author={author} />
                                <AnswerDetail answerDataDetail={answerDataDetail} />
                            </div>
                        )}
                    {/* 回答点赞评论栏 */}
                    <ContentActions contentActionsData={contentActionsData} handleComment={e => this.handleComment()} closeFullContent={e => this.closeFullContent()} />
                </div>
            )
        }
        const itemInfo = {
            type,
            id
        }

        return (
            <div className={style.card}>
                <div className={style.follower}>
                    <span>{action_text_tpl.replace("{}", name)}</span>
                    <span> · </span>
                    <span>{followUpdateTime}</span>
                </div>
                {resItem}

                {
                    this.state.showComment ? (
                        <Comment itemInfo={itemInfo} handleComment={e => this.handleComment()} />
                    ) : null
                }
            </div>
        )
    }
}

export default FollowItem;