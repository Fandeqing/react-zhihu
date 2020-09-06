import React, { Component } from 'react'
import { connect } from 'react-redux'

import HotItem from './HotItem'
import DragBar from './DragBar'
import { getHotNavData, getHotListData } from '../../../redux/actions/hot'

import style from './hot.module.scss'

class Hot extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hotNavList: [],
            hotNavListRec: [],
            showDragBar: false
        }
    }
    componentDidMount() {
        this.loadHot()
    }

    //热榜标签和热榜内容
    loadHot = async () => {
        await new Promise((resolve, reject) => {
            if (this.props.hotNavList.length === 0) {
                const res = this.props.getHotNavList()
                resolve(res)
            } else {
                resolve('getHotNavList')
            }
        })

        const navListDom = this.navList;
        const initialTag = navListDom.children[0].getAttribute('tag');
        await this.props.getHotListData(initialTag)


    }

    handleNavClick = async (e) => {
        const currentDom = e.target;
        //请求热榜数据
        if (currentDom.tagName === "SPAN") {
            const tag = currentDom.getAttribute('tag');
            console.log('tag', tag)
            await this.props.getHotListData(tag)
        }
    }



    showDragBar = () => {
        this.setState({
            showDragBar: !this.state.showDragBar
        })
    }

    render() {
        return (
            <div className={style.topStory}>
                {/*hotNav */}
                <div className={style.hotNavWrapper} >
                    <div onClick={e => this.handleNavClick(e)} className={style.hotNavItems} ref={ref => this.navList = ref}>
                        {this.props.hotNavList && this.props.hotNavList.map((item, idx) => {
                            return <span key={idx} tag={item.identifier} className={item.identifier === this.props.currentTag ? style.isActive : ""}>{item.name}</span>
                        })}</div>
                    <button className={style.btn} onClick={e => this.showDragBar()}>展开</button>

                    {
                        this.state.showDragBar ? <DragBar showDragBar={this.showDragBar} /> : null
                    }
                    {/* <DragBar showDragBar={this.showDragBar} /> */}
                </div>


                {/* hotList */}
                <div>
                    {this.props.hotList.map(
                        (item, idx) => {
                            return <HotItem item={item} idx={idx} key={idx} />
                        }
                    )}
                </div>
                {/* hotEnd */}
                <div className={style.hotEnd} >
                    没有更多内容
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        hotNavList: state.hot.hotNavList,
        hotNavListRec: state.hot.hotNavListRec,
        hotList: state.hot.hotList,
        currentTag: state.hot.currentTag
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getHotNavList: () => dispatch(getHotNavData()),
        getHotListData: tag => dispatch(getHotListData(tag))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Hot);