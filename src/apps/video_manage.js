"use strict";

class VideoManagerApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewContentHTML: (<div className="no-value">未有信息显示</div>)
        };
        this.clickPageItem = this.clickPageItem.bind(this);
    }

    componentDidMount() {
        this.renderVideoList();
    }

    closeWindow = () => {
        this.setState({
            showScanWindow: false,
            showNewVideoWindow: false,
            showVideoDetailWindow: false,
            showModifyVideoWindow: false,
            showDeleteVideoWindow: false,
        });
    }

    openScanWindow = () => {
        this.setState({
            showScanWindow: true,
            argsGroup: [{label: "目录位置", key: "path", placeholder: "输入要扫描的目录地址"}],
        });
    }

    scanDir = value => {
        const that = this;
        Req({
            method: "POST",
            url: "/backend/aip/video/scan",
            data: value,
        }).then(value => {
            if (value) {
                const viewContentHTML = (
                    <div className="view">
                        <div className="title">
                            <div className="col-md-1"></div>
                            <div className="col-md-7">名称</div>
                            <div className="col-md-2">大小</div>
                            <div className="col-md-2">操作</div>
                        </div>
                        <div className="values">
                            {value ? value.map(({name, path, size, mode, modifyTime}, i) =>
                                <div className="value">
                                    <div className="col-md-1">{i + 1}</div>
                                    <div className="col-md-7">{name}</div>
                                    <div className="col-md-2">{Math.round(size * 1000) / 1000 / 1000} KB</div>
                                    <div className="col-md-2 options">
                                        <span onClick={() => this.openNewVideoWindow(
                                            {name, path, size, mode, modifyTime})}>
                                            上新
                                        </span>
                                    </div>
                                </div>) : ""}
                        </div>
                    </div>
                );

                that.setState({viewContentHTML});
            }
        });
        this.setState({showScanWindow: false});
    }

    openNewVideoWindow = ({name, path, size, mode, modifyTime}) => {
        const that = this;
        Req({
            method: "POST",
            url: "/backend/aip/video/ffmpeg",
            data: {path}
        }).then(value => {
            const {FFmpegJSON = "{}", id = 0, path = "", name = ""} = value;
            const {streams = [], format = {}} = JSON.parse(FFmpegJSON);
            const {codec_long_name, coded_width, coded_height} = streams[0];
            const {duration, size, filename} = format;
            const videoName = path.slice(path.lastIndexOf("/") + 1, path.length);
            that.setState({
                instance: {
                    id: id,
                    size: size,
                    width: coded_width,
                    height: coded_height,
                    duration: duration,
                    title: videoName
                },
                argsGroup: [
                    {label: "唯一标识码", key: "name", val: name, viewOnly: true},
                    {label: "视频存储路径", key: "path", val: filename, viewOnly: true},
                    {label: "视频编码", key: "codec", val: codec_long_name, viewOnly: true},
                    {label: "大小", key: "size", val: size, viewOnly: true},
                    {label: "分辨率", key: "resolving", val: `${coded_width}*${coded_height}`, viewOnly: true},
                    {label: "时长", key: "duration", val: parseFloat(duration), viewOnly: true},
                    {label: "视频标题", key: "title", placeholder: "输入视频标题", val: videoName},
                    {label: "描述", key: "describe", placeholder: "输入视频描述信息", type: "multiline"},
                ],
                showNewVideoWindow: true
            });
        });
    }

    newVideo = value => {
        if (null == value) {
            return
        }
        const {instance} = this.state;
        if (value.name) {
            delete instance.name;
        }
        this.setState({showNewVideoWindow: false});
        Object.assign(instance, value);
        Req({
            method: "POST",
            url: "/backend/aip/video",
            data: instance
        }).then(() => {
            alert("创建视频成功");
        }).catch(({msg = ""}) => {
            alert("创建视频失败。 " + msg);
        });
    }

    clickPageItem(activeNum = 0) {
        this.setState({
            page: activeNum
        });
        this.renderVideoList();
    }

    renderVideoList = () => {
        const that = this;
        const {page = 0, count = 10} = this.state;
        Req({
            method: "GET",
            url: `/backend/aip/video/list?page=${page}&count=${count}`,
        }).then(value => {
            const {total, data = []} = value;
            that.setState({
                viewContentHTML: (
                    <div className="view">
                        <div className="title">
                            <div className="col-md-1"></div>
                            <div className="col-md-4">名称</div>
                            <div className="col-md-2">大小</div>
                            <div className="col-md-3">修改时间</div>
                            <div className="col-md-2">操作</div>
                        </div>
                        <div className="values">
                            {data ? data.map((v, i) => {
                                const {title, size, modifyTime} = v;
                                return (
                                    <div className="value">
                                        <div className="col-md-1">{i + 1}</div>
                                        <div className="col-md-4">{title}</div>
                                        <div
                                            className="col-md-2">{size / 1000 > 1000 ? size / 1000000 + " MB" : size / 1000 + " KB"}</div>
                                        <div className="col-md-3">{modifyTime}</div>
                                        <div className="col-md-2 options">
                                            <span onClick={() => this.showVideoDetail(v)}>详情</span>
                                            <span onClick={() => this.showModifyVideo(v)}>修改</span>
                                            <span onClick={() => this.showDeleteVideo(v)}>下架</span>
                                        </div>
                                    </div>)
                            }) : (<span className="no-value">未上架视频</span>)}
                        </div>
                    </div>
                ),
                pageComponentHTML: (
                    <div className="view">
                        <PageComponent position="pull-left" activeNum={page} docCount={data ? data.length : 0}
                                       total={total}
                                       clickPageCallback={that.clickPageItem}/>
                    </div>
                )
            });
        }).catch(({code, message}) => {
            checkErrorCode(code);
        });
    }

    showVideoDetail = video => {
        const {title, name, describe, duration, height, width, size, path, createTime, modifyTime} = video;
        this.setState({
            showVideoDetailWindow: true,
            argsGroup: [
                {label: "视频标题", key: "title", val: title, viewOnly: true},
                {label: "上新时间", key: "createTime", val: createTime, viewOnly: true},
                {label: "上架时间", key: "modifyTime", val: modifyTime, viewOnly: true},
                {label: "描述", key: "describe", val: describe, type: "multiline", viewOnly: true},
                {label: "唯一标识码", key: "name", val: name, viewOnly: true},
                {label: "视频存储路径", key: "path", val: path, viewOnly: true},
                {label: "大小", key: "size", val: size, viewOnly: true},
                {label: "分辨率", key: "resolving", val: `${width}*${height}`, viewOnly: true},
                {label: "时长", key: "duration", val: duration + " 秒", viewOnly: true},
            ],
        });
    }

    videoDetail = () => {
        this.closeWindow();
    }

    showModifyVideo = video => {
        const {title, describe} = video;
        this.setState({
            showModifyVideoWindow: true,
            argsGroup: [
                {label: "视频标题", key: "title", val: title},
                {label: "描述", key: "describe", val: describe, type: "multiline"},
            ],
            instance: video,
        });
    }

    modifyVideo = (value) => {
        const that = this;
        const {instance} = this.state;
        Object.assign(instance, value)
        Req({
            method: "POST",
            url: "/backend/aip/video",
            data: instance
        }).then(() => {
            that.renderVideoList();
        });
        this.closeWindow();
    }

    showDeleteVideo = video => {
        const {id, title} = video;
        this.setState({
            showDeleteVideoWindow: true,
            argsGroup: [],
            msg: "确认下架视频 " + title,
            instance: id,
        })
    }

    deleteVideo = () => {
        const that = this;
        const {instance} = this.state;
        Req({
            method: "DELETE",
            url: "/backend/aip/video?id=" + instance,
        }).then(() => {
            that.renderVideoList();
        });
        this.closeWindow();
    }

    render = () => {
        const {
            showScanWindow = false,
            showNewVideoWindow = false,
            showVideoDetailWindow = false,
            showModifyVideoWindow = false,
            showDeleteVideoWindow = false,
            argsGroup = [],
            viewContentHTML = "",
            pageComponentHTML = "",
            msg = ""
        } = this.state;
        return (
            <div className="main">

                <InputView showWindow={showScanWindow} title="输入扫描目录" argsGroup={argsGroup}
                           then={this.scanDir} cannel={this.closeWindow}/>
                <InputView showWindow={showNewVideoWindow} title="视频上新" argsGroup={argsGroup}
                           then={this.newVideo} cannel={this.closeWindow}/>
                <InputView showWindow={showVideoDetailWindow} title="视频详情" argsGroup={argsGroup}
                           then={this.videoDetail} cannel={this.closeWindow}/>
                <InputView showWindow={showModifyVideoWindow} title="修改视频信息" argsGroup={argsGroup}
                           then={this.modifyVideo} cannel={this.closeWindow}/>
                <InputView showWindow={showDeleteVideoWindow} title="确认下架视频" msg={msg}
                           then={this.deleteVideo} cannel={this.closeWindow}/>
                <div className="top">
                    <div className="title">视频管理</div>
                    <div className="bar">
                        <div>
                            <div onClick={this.openScanWindow}>目录扫描</div>
                            <div onClick={this.renderVideoList}>视频库</div>
                        </div>
                    </div>
                </div>
                {viewContentHTML}
                {pageComponentHTML}
            </div>
        );
    }
}