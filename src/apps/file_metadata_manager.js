"use strict";

/**
 * 元数据管理
 */
class FileMetadataManagerApp extends React.Component {
    constructor(prots) {
        super(prots);
        this.state = {
            page: 1,
            count: 100
        };
        this.loadFileMetadata = this.loadFileMetadata.bind(this);
        this.findFileMetadata = this.findFileMetadata.bind(this);
        this.clickPageItem = this.clickPageItem.bind(this);
        this.inputKeyword = this.inputKeyword.bind(this);
        this.enterEnter = this.enterEnter.bind(this);
        this.reflash = this.reflash.bind(this);
        this.changPage = this.changPage.bind(this);

        this.openLinkedWindows = this.openLinkedWindows.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.linkedFileMetadata = this.linkedFileMetadata.bind(this);
    }

    componentDidMount() {
        this.loadFileMetadata();
    }

    findFileMetadata(activeNum) {
        const that = this;
        const { keyword, page, count } = that.state;
        Req({
            method: "GET",
            url: `/backend/aip/metadata/search?keyword=${keyword}&page=${activeNum ? activeNum : page}&count=${count}`,
        }).then(value => {
            const { total, data = [] } = value;
            that.setState({ total, data, errorMsg: "", page: 1 });
        }).catch(({ code, message }) => {
            checkErrorCode(code);
            that.setState({
                errorMsg: message
            });
        });
    }

    loadFileMetadata(activeNum) {
        const that = this;
        const { page, count } = that.state;
        Req({
            method: "GET",
            url: `/backend/aip/metadata/all?page=${activeNum ? activeNum : page}&count=${count}`,
        }).then(value => {
            const { total, data = [] } = value;
            that.setState({ total, data, errorMsg: "" });
        }).catch(({ code, message }) => {
            checkErrorCode(code);
            that.setState({ errorMsg: message });
        });
    }

    openLinkedWindows(filemetadata) {
        const that = this;
        const { createTime, fileName, fileSize, file_type, fullpath, id, isLink } = filemetadata;
        Req({
            method: "GET",
            url: `/backend/aip/video/analysis/file?id=${id}`
        }).then(value => {
            const { streams = [], format = {} } = JSON.parse(value);
            let argsGroup = [
                { label: "id", key: "id", val: id, viewOnly: true },
                { label: "源数据存储位置", key: "path", val: fullpath, viewOnly: true },
                { label: "大小", key: "size", val: fileSize, viewOnly: true },
                { label: "文件名", key: "filename", val: fileName, viewOnly: true },
                { label: "文件类型", key: "file_type", val: file_type, viewOnly: true },
                { label: "创建时间", key: "create_time", val: createTime, viewOnly: true },
                { label: "是否入库", key: "is_link", val: isLink ? "已入库" : "未入库", viewOnly: true }
            ];
            if (streams.length > 1) {
                argsGroup.push({ label: "是否为视频文件", key: "isVideo", val: "true", viewOnly: true })
                streams.map(({ width, height, codec_name, display_aspect_ratio, codec_long_name }) => {
                    if (!width) { return; }
                    [
                        { label: "视频宽度", key: "width", val: width, viewOnly: true },
                        { label: "视频高度", key: "height", val: height, viewOnly: true },
                        { label: "播放比例", key: "display_aspect_ratio", val: display_aspect_ratio, viewOnly: true },
                        { label: "编码名称", key: "codec_name", val: codec_name, viewOnly: true },
                        { label: "编码信息", key: "codec_long_name", val: codec_long_name, viewOnly: true },
                    ].map(item => argsGroup.push(item));
                    Object.assign(filemetadata, {isVideo: true, width, height, codec_name, display_aspect_ratio, codec_long_name});
                })
                const {duration} = format;
                argsGroup.push({ label: "视频时长", key: "duration", val: duration, viewOnly: true });
                Object.assign(filemetadata, {duration});       
            } else {
                argsGroup.push({ label: "是否为视频文件", key: "isVideo", val: "false", viewOnly: true })
            }
            that.setState({
                showLinkedWindows: true,
                instance: filemetadata,
                argsGroup,
            });
        }).catch(({ code, message }) => {
            checkErrorCode(code);
            that.setState({ errorMsg: message });
        })
    }

    closeWindow() {
        this.setState({
            showLinkedWindows: false
        });
    }

    linkedFileMetadata() {
        const {instance } = this.state;
        Req({
            method: "PUT",
            url: `/backend/aip/object`,
            data: instance
        }).then(value => {
            
        }).catch(({ code, message }) => {
            checkErrorCode(code);
            that.setState({ errorMsg: message });
        })
        this.setState({
            showLinkedWindows: false
        });
    }

    renderFileMetadataList(data = []) {
        return (
            <div className="view">
                <div className="title">
                    <div className="col-md-1">序号</div>
                    <div className="col-md-7">名称</div>
                    <div className="col-md-1">大小</div>
                    <div className="col-md-1">类型</div>
                    <div className="col-md-2">操作</div>
                </div>
                <div className="values">
                    {data ? data.map((v, i) => {
                        const { fileName, fileSize, file_type } = v;
                        return (
                            <div className="value" onClick={() => this.openLinkedWindows(v)}>
                                <div className="col-md-1">{i + 1}</div>
                                <div className="col-md-7">{fileName}</div>
                                <div className="col-md-1">
                                    {fileSize / 1000 > 1000 ? (fileSize / 1000000).toFixed(2) + " MB" : (fileSize / 1000).toFixed(2) + " KB"}
                                </div>
                                <div className="col-md-1">{file_type}</div>
                                <div className="col-md-2 options">
                                    <span onClick={() => this.showVideoDetail(v)}>详情</span>
                                    <span onClick={() => this.showModifyVideo(v)}>入库</span>
                                    <span onClick={() => this.showDeleteVideo(v)}>删除</span>
                                </div>
                            </div>)
                    }) : <span className="no-value">无内容显示</span>}
                </div>
            </div>
        );
    }

    inputKeyword(event) {
        this.setState({ keyword: event.target.value });
    }

    enterEnter(event) {
        const that = this;
        if (event.keyCode !== 13) {
            return;
        }
        const { keyword } = this.state;
        if (!keyword) {
            that.setState({ errorMsg: "请输入搜索内容", total: 0 });
            return;
        }
        this.findFileMetadata(1)
    }

    changPage(val) {
        const { page } = this.state;
        this.clickPageItem(page + val < 1 ? 1 : page + val);
    }

    clickPageItem(activeNum = 0) {
        const { page, keyword } = this.state;
        if (page == activeNum) {
            return;
        }
        this.setState({ page: activeNum });
        if (keyword) {
            this.findFileMetadata(activeNum)
        } else {
            this.loadFileMetadata(activeNum)
        }
    }

    reflash() {
        this.setState({ keyword: undefined, page: 1, activeNum: 1 });
        this.loadFileMetadata(1);
    }

    render() {
        const { data, page, count, total, errorMsg = "", showLinkedWindows = false, argsGroup = [] } = this.state;
        return (
            <div className="main">
                <InputView showWindow={showLinkedWindows} title="连接元数据" argsGroup={argsGroup}
                    then={this.linkedFileMetadata} cannel={this.closeWindow} />

                <div className="top">
                    <div className="title">元数据管理</div>
                    <div className="bar">
                        <div>
                            <div>统计分类</div>
                            <div>视频库</div>
                            <div onClick={this.reflash}>刷新</div>
                            <div>
                                <input type="text" id="search_keyword" onChange={this.inputKeyword} onKeyDown={this.enterEnter} aria-describedby="搜索建议"
                                    placeholder="输入关键词检索"
                                    autoComplete="off" />
                            </div>
                        </div>
                        <div className="pull-right">
                            <div onClick={() => this.changPage(-1)}>上一页</div>
                            <div onClick={() => this.changPage(1)}>下一页</div>
                        </div>
                    </div>
                </div>
                {errorMsg.length != 0 ? <div className="values"><span className="no-value">{errorMsg}</span></div> : this.renderFileMetadataList(data)}
                <div className="view">
                    <PageComponent position="pull-left" activeNum={page} docCount={count}
                        total={total} clickPageCallback={this.clickPageItem} />
                </div>
            </div>
        );
    }
}