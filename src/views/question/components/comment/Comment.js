import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'
import {
    getAnswerComments
    , getChildComments,
    getVideoComments
} from '../../../../api/comments'
import CommentEdit from '../../../../components/comment-edit/CommentEdit'
import CommentItem from '../../../../components/comment-item/CommentItem'
import {
    createCommentByVideo,
    createCommentByAnswer,
    createCommentByChild
} from '../../../../models'
import { Pagination } from 'antd';
import { SwitchIcon } from "../../../../components/svg/SwitchIcon"
import CommentsPop from "../../../../components/comments-pop/CommentsPop"

import style from './comment.module.scss'

class Comments extends Component {
    constructor(props) {
        super(props)
        this.type = props.itemInfo.type
        //回答or视频or文章的id
        this.rootId = props.itemInfo.id
        this.fullContent = props.itemInfo
        this.handleComment = props.handleComment

        this.state = {
            commentsNum: null,
            comments: [],
            //父评论
            rootComment: {},
            //所有点击过查看的子评论
            childCommentsAll: {},
            //当前父评论的子评论
            childCommentRes: [],
            totals: 0,
            showCommentsPop: false,
            //关闭评论的按钮
            showCloseComment: false,
        }


    }

    componentDidMount() {
        this.loadComments()
        window.addEventListener('scroll', this.handleScoll)

    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScoll)
    }

    handleScoll = () => {
        this.topDom = this.topRef;
        this.bottomDom = this.bottomRef;

        const top = this.topDom.getBoundingClientRect().top;
        const bottom = this.bottomDom.getBoundingClientRect().top;

        const showCloseComment = (top < 0) && (bottom > window.innerHeight)
        if (showCloseComment) {
            if (!this.state.showCloseComment)
                this.setState({
                    showCloseComment: true
                })

        } else {
            if (this.state.showCloseComment)
                this.setState({
                    showCloseComment: false
                })
        }
    }

    loadComments = async () => {
        let commentsData, common_counts, commentsInit, totals
        if (this.type === 'zvideo') {
            commentsData = await getVideoComments({ vId: this.rootId, order: "normal", offset: 0 });
            // let { common_counts, data: commentsInit, paging: { totals } } = commentsData;
            common_counts = commentsData.common_counts;
            commentsInit = commentsData.data;
            totals = commentsData.paging.totals
        }
        else if (this.type === 'answer') {
            commentsData = await getAnswerComments({ answerId: this.rootId, order: "normal", offset: 0 });
            // var { common_counts, data: commentsInit, paging: { totals } } = commentsData;
            common_counts = commentsData.common_counts;
            commentsInit = commentsData.data;
            totals = commentsData.paging.totals
        }
        //评论数
        this.setState({ commentsNum: common_counts })
        //评论
        let comments;
        if (this.type === 'zvideo') {
            comments = commentsInit.map(comment => createCommentByVideo(comment))
        } else if (this.type === 'answer') {
            comments = commentsInit.map(comment => createCommentByAnswer(comment))
        }
        this.setState({ comments: comments })

        this.setState({ totals })

    }
    itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <span>上一页</span>;
        }
        if (type === 'next') {
            return <span>下一页</span>;
        }
        return originalElement;
    }

    handlePagination = async (pageNum) => {
        let commentsData;
        if (this.type === 'video') {
            commentsData = await getVideoComments({
                vId: this.rootId, order: "normal",
                offset: (pageNum - 1) * 20
            })
        } else if (this.type === 'answer') {
            commentsData = await getAnswerComments({
                answerId: this.rootId, order: "normal",
                offset: (pageNum - 1) * 20
            })
        }

        const { data: commentsInit } = commentsData;

        //评论
        const comments = commentsInit.map(comment => createCommentByVideo(comment))
        this.setState({ comments: comments })
    }


    handleComments = async (e, rootId, comment) => {
        this.setState({ rootComment: comment })
        //点击过查看全部的评论存在state中
        if (!Object.keys(this.state.childCommentsAll).includes(rootId.toString())) {

            const childCommentsData = await getChildComments({ cId: rootId })
            const { data: childCommentsInit } = childCommentsData;

            const childComments = childCommentsInit.map(comment => createCommentByChild(comment))
            // childCommentsAll: {rootId:[childComments] ... }
            this.state.childCommentsAll[rootId] = childComments
            const newState = this.state.childCommentsAll
            this.setState(
                { childCommentsAll: newState }
            )
        }
        const childCommentRes = this.state.childCommentsAll[rootId]
        this.setState({ childCommentRes })
        this.setState({ showCommentsPop: true })

        document.body.style.overflow = 'hidden'

    }
    handleClose = () => {
        this.setState({ showCommentsPop: false })
        document.body.style.overflow = 'auto'
    }
    showCommentClose = () => {
        if (this.state.showCloseComment) {
            const timer = setTimeout(() => {
                this.commentBtnRef && this.commentBtnRef.classList.add(`${style.showBtn}`)
                clearTimeout(timer)
            }, 10)
        }
    }
    render() {
        this.showCommentClose();


        return (
            <div className={style.comment}>
                {/* 评论区头部 */}
                <div className={style.topBar} ref={ref => this.topRef = ref}>
                    <div className={style.topBarTitle}><h2>{this.state.commentsNum} 条评论</h2></div>
                    <div className={style.topBarOption}>
                        <button className={style.btn}>
                            <span><SwitchIcon /></span>切换为时间排序
                        </button>
                    </div>
                </div>
                {/* 评论内容 */}
                <div>
                    <div className={style.commentList}>
                        {this.state.comments.map((comment, idx) => {
                            const { child_comments, child_comment_count, id: rootId } = comment
                            const res =
                                <ul key={idx} className={style.commentItem}>
                                    {/* 父评论 */}
                                    <li><CommentItem item={comment} /></li>
                                    {/* 子评论 */}
                                    {child_comments.length > 0 ?
                                        child_comments.map((child_comment, idx) =>
                                            <li key={idx} className={style.childComment}><CommentItem item={child_comment} /></li>
                                        ) : null
                                    }
                                    {/*  是否展开*/}
                                    {child_comment_count > 5 ?
                                        <div className={style.commentBtnWrap}>
                                            <button onClick={e => this.handleComments(e, rootId, comment)}>
                                                查看全部 {child_comment_count} 条回复 </button>
                                        </div>
                                        : (
                                            child_comment_count > 2 ?
                                                <div className={style.commentBtnWrap}>

                                                    <button>展开其他 {child_comment_count - 2} 条回复</button>
                                                </div> : null
                                        )
                                    }
                                </ul>
                            return res
                        })}
                    </div>
                    {/* pagination */}
                    <div className={style.paginationWrap}>
                        <Pagination defaultCurrent={1} total={this.state.totals} pageSize={20}
                            className={style.pagination}
                            itemRender={this.itemRender}
                            onChange={cur => this.handlePagination(cur)}
                        />
                    </div>
                </div>
                <div >
                    {this.state.showCommentsPop ?
                        <CommentsPop handleClose={e => this.handleClose(e)} rootComment={this.state.rootComment} childComments={this.state.childCommentRes} ref={ref => this.commentsPop = ref} />
                        : null
                    }
                </div>
                {/* 输入评论 */}
                <div ref={ref => this.bottomRef = ref}>
                    <CommentEdit />
                </div>
                <div>
                    {this.state.showCloseComment ? (
                        <button onClick={this.handleComment} className={style.btnClose} ref={ref => this.commentBtnRef = ref}>收起评论
                            <span>
                                <svg class="Zi Zi--ArrowUp" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M12 11l-3.716 3.782a.758.758 0 0 1-1.064 0 .738.738 0 0 1 0-1.052l4.249-4.512a.758.758 0 0 1 1.064 0l4.246 4.512a.738.738 0 0 1 0 1.052.757.757 0 0 1-1.063 0L12.002 11z" fillRule="evenodd"></path></svg>
                            </span>
                        </button>
                    ) : null}
                </div>
            </div>
        )
    }
}



export default withRouter(Comments);