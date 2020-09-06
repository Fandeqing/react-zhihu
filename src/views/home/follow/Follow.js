import React, { Component } from 'react'

import { getFollow, getMoreFollow } from '../../../api/follow'
import {
    createAnswerByFollow,
    createVideoByFollow
} from '../../../models/index'
import FollowItem from './FollowItem'
import throttle from '../../../utils/throttle'
import extractUrlValue from '../../../utils/urlparam'
import Loading from '../../../components/loading/Loading'

import style from './follow.module.scss'

class Follow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            followList: [],
            getMoreData: true,
        }
    }

    componentDidMount() {
        this.loadFollowData()
        window.addEventListener('scroll', this.handleScroll)
    }

    loadFollowData = async () => {
        const followData = await getFollow();
        const followList = followData.data.map(item => {
            if (item.target.type === "answer") {
                return createAnswerByFollow(item)
            } else if (item.target.type === "zvideo") {
                return createVideoByFollow(item)
            }
            return null;
        }).filter(item => item != null)

        this.setState({
            followList: followList,
            nextUrl: followData.paging.next
        })

    }

    //下滑加载更多
    handleScroll = () => {
        let scrollTop = document.documentElement.scrollTop;
        let windowHeight = document.body.clientHeight;
        let scrollHeight = document.body.scrollHeight;

        if (scrollTop + windowHeight >= scrollHeight - 100) {
            this.addMore()
        }
    }

    addMore = throttle(async () => {
        this.setState({
            getMoreData: false
        })
        let param = {
            session_start_id: undefined, after_id: undefined, limit: 6, action: 'down'
        }
        param.session_start_id = extractUrlValue('session_start_id', this.state.nextUrl)
        param.after_id = extractUrlValue('after_id', this.state.nextUrl)
        //加载更多关注数据
        const followData = await getMoreFollow(param);
        this.setState({
            getMoreData: true
        })
        const followList = followData.data.map(item => {
            if (item.target.type === "answer") {
                return createAnswerByFollow(item)
            } else if (item.target.type === "zvideo") {
                return createVideoByFollow(item)
            }
            return null;
        }).filter(item => item != null)
        this.setState({
            followList: [...this.state.followList, ...followList],
            nextUrl: followData.paging.next
        })
    }, 2000)



    render() {
        const followList = this.state.followList.map((item, i) => {
            return <FollowItem item={item} key={i} />
        })

        if (!this.state.getMoreData) {
            followList.push(
                <div className={style.loading}>
                    <Loading type={'bars'} color={'lightgrey'} />
                </div >
            )
        }

        return (
            <div className={style.topStory}>
                {followList}
            </div>
        )
    }
}

export default Follow;