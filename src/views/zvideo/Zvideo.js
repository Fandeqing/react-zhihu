import React, { Component } from 'react'
import { parse } from "query-string";

import {
    getZvideo,
    getZvideoRecommend,
    getMoreZvideoRecommend
} from '../../api/zvideo'
import {
    createVideoByZvideo,
    createVideoByZvideoRec
} from '../../models/index'
import Player from "griffith";
import { AddIcon } from '../../components/svg/AddIcon'
import ArrowDown from '../../components/svg/ArrowDown'
import ArrowUp from '../../components/svg/ArrowUp'
import ToolBar from "./ToolBar"
import Comments from "./Comments"
import VideoRecItem from './VideoRecItem'
import throttle from '../../utils/throttle'
import extractUrlValue from '../../utils/urlparam'

import style from './zvideo.module.scss'


class Zvideo extends Component {

    constructor(props) {
        super(props)
        this.query = parse(props.location.search)
        this.video_id = this.query.video_id

        this.state = {
            zvideo: null,
            showDesc: false,
            nextUrl: "",
            zvideoRec: [],
        }
    }

    componentDidMount() {
        this.loadZvideo();
        this.loadZvideoRecommend();
        window.addEventListener('scroll', this.handleScroll)
    }

    loadZvideo = async () => {
        let vId = this.video_id;
        const zvideoData = await getZvideo({ vId })
        this.setState({ zvideo: createVideoByZvideo(zvideoData) })
    }

    loadZvideoRecommend = async () => {
        const vId = this.props.match.params.id
        const zvideoRecData = await getZvideoRecommend({ vId })
        const { data: zvideoRecInit, paging: { next } } = zvideoRecData;
        const zvideoRec = zvideoRecInit.map(video => createVideoByZvideoRec(video))
        this.setState({
            zvideoRec: zvideoRec,
            nextUrl: next
        })
    }

    handleScroll = () => {
        let windowHeight = document.body.clientHeight;

        let recVideoDom = this.recVideoRef;
        let bottom = recVideoDom.getBoundingClientRect().bottom;
        // console.log('recVideoDom.bottom ', bottom, 'windowHeight', windowHeight)
        if (bottom <= windowHeight) {
            // console.log('handleScroll')
            this.addMore()
        }
    }

    addMore = throttle(async () => {
        const vId = this.props.match.params.id
        let param = {
            vId: vId, offset: undefined, limit: 10
        }
        param.offset = extractUrlValue('offset', this.state.nextUrl)
        param.limit = extractUrlValue('limit', this.state.nextUrl)
        //加载更多推荐视频
        const moreRecVideo = await getMoreZvideoRecommend(param);

        const { data: moreVideoRec, paging: { next } } = moreRecVideo;
        const zvideoRec = moreVideoRec.map(video => createVideoByZvideoRec(video))
        this.setState({
            zvideoRec: [...this.state.zvideoRec, ...zvideoRec],
            nextUrl: next
        })
    }, 2000)


    handleDesc = e => {
        const descDom = this.desc;
        descDom.classList.toggle(`${style.show}`)
        this.setState({ showDesc: !this.state.showDesc })
    }


    render() {

        let sources, cover_url, title;
        if (this.state.zvideo) {
            sources = this.state.zvideo.playlist;
            cover_url = this.state.zvideo.cover_url;
            title = this.state.zvideo.title
        }
        //fakeData
        const toBarData = { voteNum: 1962, commentNum: 326 }

        return (
            <div className={style.zvideo}>
                <div className={style.mainCol}>
                    {/* video */}
                    <div className={style.video}>
                        <div className={style.player}>
                            {this.state.zvideo ?
                                <Player sources={sources} cover={cover_url} duration={0} id={""} /> : null}
                        </div>
                    </div>
                    {/* 作者 */}
                    <div className={style.author}>
                        <span className={style.avator}>
                            <img src="https://pic3.zhimg.com/v2-bee337c97796fae3dc71c0ea42ddc57e_is.jpg?source=12a79843" srcSet="https://pic3.zhimg.com/v2-bee337c97796fae3dc71c0ea42ddc57e_im.jpg?source=12a79843 2x" alt="观察者网" />
                        </span>
                        <div className={style.authorContent}>
                            <span className={style.authorName}>观察者网</span>
                            <span className={style.authorDesc}>已认证的官方帐号</span>
                        </div>
                        <button className={style.btn}>
                            <span className={style.addIcon}><AddIcon /></span>
                            关注
                        </button>
                    </div>
                    {/* 描述 */}
                    <div className={style.content}>
                        <div onClick={e => this.handleDesc(e)}>
                            <div className={style.headline}>
                                <h1>{title}</h1>
                                <span >
                                    {this.state.showDesc ? <ArrowUp /> : <ArrowDown />}
                                </span>
                            </div>
                            <p className={style.desc} ref={ref => this.desc = ref}>
                                {/* fakeData */}
                                最近有条新闻冲上了热搜，江苏文科第一430分却无缘清北。其实，这是一个更大问题的缩影。这个问题就是教育公平，虽然我国实行统一高考，但各地考试内容、录取名额不同，竞争激烈程度也不同，使得同卷同分而不同校。这几年各省对高考进行了一些改革，但问题并不在考试怎么考，而是在于名额怎么分配。本期节目@王骁Albert 就来聊聊，为什么同样是高考，有的人比别人更公平？
                            </p>
                        </div>
                        <div className={style.meta}>发布于 07-30 · 62.4 万次播放</div>
                    </div>
                    <div>
                        <ToolBar toBarData={toBarData} />
                    </div>
                    {/* 评论 */}
                    <div>
                        <Comments />
                    </div>
                </div>
                {/* 相关推荐 */}
                <div className={style.sideCol}>
                    <div>
                        <div><h2>相关推荐</h2></div>
                        <div>
                            <div ref={ref => this.recVideoRef = ref} className={style.recVideo}>
                                {this.state.zvideoRec.map((video, idx) => {
                                    return <VideoRecItem key={idx} video={video} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Zvideo;