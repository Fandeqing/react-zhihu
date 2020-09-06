import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from 'react-redux'

import {
    getHotNavData,
    putHotNavData,
    getHotListData
} from '../../../redux/actions/hot'


import style from './drag-bar.module.scss'

const getHotItems = hotList => {
    return hotList.map((item, idx) => ({
        id: item.name,
        content: item.name,
        identifier: item.identifier
    }))
}

// 重新记录数组顺序
const reorder = (list, startIndex, endIndex) => {
    console.log(startIndex, endIndex)
    const result = Array.from(list);
    //删除并记录 删除元素
    const [removed] = result.splice(startIndex, 1);
    console.log(removed)
    //将原来的元素添加进数组
    result.splice(endIndex, 0, removed);
    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

class DragBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotListMine: null,
            hotListRec: null
        };
        this.onDragEnd = this.onDragEnd.bind(this);
        //drop组件映射
        this.id2List = {
            droppableMine: 'hotListMine',
            droppableRec: 'hotListRec'
        }
    }
    componentDidMount() {
        this.setState({
            hotListMine: getHotItems(this.props.hotNavList),
            hotListRec: getHotItems(this.props.hotNavListRec)
        })
    }

    postHotList = async e => {
        const data = this.state.hotListMine.map(item => item.identifier);
        const rec_data = this.state.hotListRec.map(item => item.identifier);
        const postData = { data, rec_data }
        await this.props.putHotNavData(postData)
        await this.props.getHotNavData()
    }

    onDragEnd(result) {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.state[this.id2List[source.droppableId]],
                source.index,
                destination.index
            );

            if (source.droppableId === 'droppableRec') {
                this.setState({ 'hotListRec': items });
            } else {
                this.setState({ 'hotListMine': items });
            }

        } else {
            const result = move(
                this.state[this.id2List[source.droppableId]],
                this.state[this.id2List[destination.droppableId]],
                source,
                destination
            );

            this.setState({
                hotListMine: result.droppableMine,
                hotListRec: result.droppableRec
            });
        }

    }

    handleTagClick = async e => {
        const currentDom = e.target;
        //请求热榜数据
        const tag = currentDom.getAttribute('tag');
        await this.props.getHotListData(tag)
        this.props.showDragBar()

    }

    render() {

        return (
            <DragDropContext onDragEnd={this.onDragEnd} >
                <div className={style.navPad}>
                    {/* 我的榜单 */}
                    <div className={style.navPadMine}>
                        <div className={style.navPadMineTop}>
                            <div className={style.navPadText}>
                                <span className={style.navPadTitle}>我的榜单</span>
                                <span className={style.navPadHint}>拖动调整顺序</span>
                            </div>
                            <button className={style.btn} onClick={this.props.showDragBar}>收起
                                <span>
                                    <svg class="Zi Zi--ArrowUp HotListNav-expandButtonIcon" width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 11l-3.716 3.782a.758.758 0 0 1-1.064 0 .738.738 0 0 1 0-1.052l4.249-4.512a.758.758 0 0 1 1.064 0l4.246 4.512a.738.738 0 0 1 0 1.052.757.757 0 0 1-1.063 0L12.002 11z" fillRule="evenodd"></path></svg>
                                </span>
                            </button>
                        </div>
                        <div className={style.navPadMineDrop}>
                            <Droppable droppableId="droppableMine" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={style.navPadMineWrap}
                                        onClick={e => this.handleTagClick(e)}
                                    >
                                        {this.state.hotListMine && this.state.hotListMine.map((item, index) => {
                                            const fixedItem = <div tag='total' className={`${style.navPadMineItem} ${'total' === this.props.currentTag ? style.isActive : ""}`} key={item.id}>全站</div>
                                            const draggableItem = (
                                                <Draggable key={item.id}
                                                    draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            tag={item.identifier}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`${style.navPadMineItem} ${item.identifier === this.props.currentTag ? style.isActive : ""}`}
                                                        >
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                            if (item.id === '全站') {
                                                return fixedItem;
                                            } else {
                                                return draggableItem;
                                            }
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                    {/* 推荐榜单 */}
                    <div className={style.navPadRec}>
                        <div className={style.navPadRecTop}>
                            <div className={style.navPadText}>
                                <span className={style.navPadTitle}>推荐榜单</span>
                                <span className={style.navPadHint}>拖动添加至我的榜单</span>
                            </div>
                        </div>
                        <div className={style.navPadRecDrop}>
                            <Droppable droppableId="droppableRec" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={style.navPadRecWrap}
                                    >
                                        {this.state.hotListRec && this.state.hotListRec.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={style.navPadRecItem}
                                                    >
                                                        {item.content}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <div className={style.navPadRecBot}>
                            <span className={style.btnWrap} onClick={this.props.showDragBar}>
                                <button className={style.btnCancel}>取消</button>
                                <button className={style.btnConfirm} onClick={e => this.postHotList(e)}>确认</button>
                            </span>
                        </div>

                    </div>

                </div>

            </DragDropContext>
        )
    }
}


const mapStateToProps = state => {
    return {
        hotNavList: state.hot.hotNavList,
        hotNavListRec: state.hot.hotNavListRec,
        currentTag: state.hot.currentTag

    }
}

const mapDispatchToProps = dispatch => {
    return {
        getHotNavData: () => dispatch(getHotNavData()),
        putHotNavData: data => dispatch(putHotNavData(data)),
        getHotListData: tag => dispatch(getHotListData(tag))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DragBar);

