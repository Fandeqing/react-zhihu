import React, { Component } from 'react'
import { connect } from 'react-redux'

import RecommendItem from './RecommendItem'
import { getRecommendData, getNextPageRecData } from '../../../redux/actions/recommend'
import throttle from '../../../utils/throttle'
import extractUrlValue from '../../../utils/urlparam'
import Loading from '../../../components/loading/Loading'

import style from './recommend.module.scss'



class Recommend extends Component {
    state = {
        getMoreData: true,
    }


    componentDidMount() {
        this.loadRecommndData();
        window.addEventListener('scroll', this.handleScroll)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    //加载推荐数据
    loadRecommndData = () => {
        if (this.props.recommendData.length === 0) {
            this.props.getRecommend();
        }
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
            page_number: undefined, after_id: undefined, limit: 6, action: 'down'
        }
        param.page_number = extractUrlValue('page_number', this.props.nextRecUrl)
        param.after_id = extractUrlValue('after_id', this.props.nextRecUrl)

        await this.props.getNextPageRecData(param)
        this.setState({
            getMoreData: true
        })
    }, 2000)



    render() {
        const { recommendData } = this.props;
        let recommendList = []
        if (recommendData.length > 0) {
            recommendList = this.props.recommendData.map((item, i) => {
                return <RecommendItem item={item} key={i} />
            })
        }
        if (!this.state.getMoreData) {
            recommendList.push(
                <div className={style.loading}>
                    <Loading type={'bars'} color={'lightgrey'} />
                </div >
            )
        }

        return (
            <div className={style.topStory}>
                {recommendList}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        recommendData: state.recommend.recommendList,
        nextRecUrl: state.recommend.nextRecUrl
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRecommend: () => dispatch(getRecommendData()),
        getNextPageRecData: param => dispatch(getNextPageRecData(param))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Recommend);