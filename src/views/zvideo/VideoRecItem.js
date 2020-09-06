import React, { Component } from 'react'

import LazyLoad from 'react-lazyload'
import style from './video-rec-item.module.scss'

class VideoRecItem extends Component {

    //时间转换 11:12:31
    getTime(duration) {
        let durationSec = parseInt(duration);
        const hour = durationSec > 3600 ? parseInt(durationSec / 3600) : 0;
        durationSec %= 3600;
        const mins = durationSec > 60 ? parseInt(durationSec / 60) : 0;
        durationSec %= 60;
        const secs = durationSec;

        const hourRes = hour > 0 ? (hour > 9 ? `${hour}:` : `0${hour}:`) : ""
        const minsRes = mins > 0 ? (mins > 9 ? `${mins}:` : `0${mins}:`) : ""
        const secsRes = secs > 0 ? (secs > 9 ? `${secs}` : `0${secs}`) : "00"

        return `${hourRes}${minsRes}${secsRes}`

    }

    render() {
        const { video } = this.props;
        const { id, duration, thumbnail, excerpt, author: { avatar_url }, video_id } = video;

        return (
            <div>
                <div className={style.videoRec}>
                    <a href={`/zvideo/${id}?video_id=${video_id}`} target="_blank" rel="noopener noreferrer" className={style.videoRecHref}>
                        <div className={style.imgWrap}>
                            <LazyLoad>
                                <img src={thumbnail} alt="thumbnail" />
                            </LazyLoad>
                            <span>{this.getTime(duration)}</span>
                        </div>
                        <div className={style.contentWraper}>
                            <div className={style.content}>{excerpt}</div>
                            <div className={style.meta}>
                                <span><img src={avatar_url} alt="avatar" /></span>
                                观察者网 · 5.7 万次播放
                        </div>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}

export default VideoRecItem;