import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'
import {
    getVideoComments
    , getChildComments
} from '../../api/comments'
import CommentEdit from '../../components/comment-edit/CommentEdit'
import CommentItem from '../../components/comment-item/CommentItem'
import {
    createCommentByVideo,
    createCommentByChild
} from '../../models'
import { Pagination } from 'antd';
import { SwitchIcon } from "../../components/svg/SwitchIcon"
import CommentsPop from "../../components/comments-pop/CommentsPop"

import style from './comments.module.scss'

class Comments extends Component {
    constructor(props) {
        super(props)

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
            showMoreComments: false,
        }
    }

    componentDidMount() {
        this.loadComments()
    }

    loadComments = async () => {
        this.vId = this.props.match.params.id
        const commentsData = await getVideoComments({ vId: this.vId, order: "normal", offset: 0 })
        const { common_counts, data: commentsInit, paging: { totals } } = commentsData;
        //评论数
        this.setState({ commentsNum: common_counts })
        //评论
        const comments = commentsInit.map(comment => createCommentByVideo(comment))
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
        const commentsData = await getVideoComments({
            vId: this.vId, order: "normal",
            offset: (pageNum - 1) * 20
        })
        const { data: commentsInit } = commentsData;

        //评论
        const comments = commentsInit.map(comment => createCommentByVideo(comment))
        this.setState({ comments: comments })
    }


    handleFullComments = async (e, rootId, comment) => {
        await this.handleChildComments(e, rootId, comment)
        this.setState({ showCommentsPop: true })
        document.body.style.overflow = 'hidden'

    }
    handleMoreComments = async (e, rootId, comment) => {
        await this.handleChildComments(e, rootId, comment)
        this.setState({ showMoreComments: true })
        // console.log('childCommentRes', this.state.childCommentRes)
    }
    handleChildComments = async (e, rootId, comment) => {

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
        console.log("this.state.childCommentsAll[rootId]", this.state.childCommentsAll[rootId])
        this.setState({ childCommentRes })
    }
    handleClose = () => {
        this.setState({ showCommentsPop: false })
        document.body.style.overflow = 'auto'
    }
    render() {

        return (
            <div className={style.comment}>
                {/* 评论区头部 */}
                <div className={style.topBar}>
                    <div className={style.topBarTitle}><h2>{this.state.commentsNum} 条评论</h2></div>
                    <div className={style.topBarOption}>
                        <button className={style.btn}>
                            <span><SwitchIcon /></span>切换为时间排序
                        </button>
                    </div>
                </div>
                {/* 输入评论 */}
                <div>
                    <CommentEdit />
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
                                            <li key={idx} className={style.childComment}><CommentItem item={child_comment} /></li>)
                                        : null
                                    }
                                    {/* 更多子评论 */}
                                    {(this.state.showMoreComments && this.state.childCommentsAll[rootId] && this.state.childCommentsAll[rootId].length > 0) ?
                                        this.state.childCommentsAll[rootId].slice(2).map((child_comment, idx) =>
                                            <li key={idx} className={style.childComment}><CommentItem item={child_comment} /></li>
                                        ) : null}
                                    {/*  是否展开*/}
                                    {child_comment_count > 10 ?
                                        <div className={style.commentBtnWrap}>
                                            <button onClick={e => this.handleFullComments(e, rootId, comment)}>
                                                查看全部 {child_comment_count} 条回复 </button>
                                        </div>
                                        : (
                                            child_comment_count > 2 ? (
                                                (this.state.showMoreComments && this.state.childCommentsAll[rootId] && this.state.childCommentsAll[rootId].length > 0) ? null :
                                                    <div className={style.commentBtnWrap}>
                                                        <button onClick={e => this.handleMoreComments(e, rootId, comment)} >展开其他 {child_comment_count - 2} 条回复</button>
                                                    </div>) : null
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
            </div >
        )
    }
}



export default withRouter(Comments);