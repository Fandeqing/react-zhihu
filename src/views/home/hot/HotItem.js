import React, { Component } from 'react'

import HotIcon from '../../../components/svg/HotIcon'
import ShareIcon from '../../../components/svg/ShareIcon'

import style from './hot-item.module.scss'


class HotItem extends Component {

    componentDidMount() {
        if (this.props.idx < 3) {
            const rankDom = this.rank;
            rankDom.classList.add(`${style.hot}`)
        }
        if (this.props.item.title.length > 22) {
            const excerptDom = this.excerpt;
            excerptDom.classList.add(`${style.titleMultiLine}`)
        }
    }
    componentDidUpdate() {
        if (this.props.idx < 3) {
            const rankDom = this.rank;
            rankDom.classList.add(`${style.hot}`)
        }
        if (this.props.item.title.length > 22) {
            const excerptDom = this.excerpt;
            excerptDom.classList.add(`${style.titleMultiLine}`)
        }
    }

    render() {
        const { item, idx } = this.props;
        const { title, id, excerpt, detail_text, thumbnail = "" } = item;

        return (
            <div className={style.hotItem}>
                <div className={style.idx}>
                    <div ref={ref => this.rank = ref} className={style.rank}>{idx + 1}</div>
                </div>

                <div className={style.content}>
                    <div>
                        <a target="_blank" rel="noopener noreferrer" href={`/question/${id}`} >
                            <h2 className={style.title}>{title}</h2>
                            <p ref={ref => this.excerpt = ref} className={style.excerpt}>{excerpt}</p>
                        </a>
                    </div>
                    <div className={style.hotBottom}>
                        <span className={style.icon}><HotIcon />{detail_text}</span>
                        <button className={style.btn}><ShareIcon /> 分享</button>
                    </div>
                </div>

                {thumbnail ?
                    <div className={style.thumbnail}>
                        <img src={thumbnail} alt="thumbnail" />
                    </div> :
                    <div className={style.emptyThumbnail}>
                    </div>
                }
            </div>
        )
    }
}


export default HotItem;
