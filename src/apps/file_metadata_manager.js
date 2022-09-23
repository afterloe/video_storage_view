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
        this.reflash = this.reflash.bind(this)
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
            that.setState({ total, data, errorMsg: "" });
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
                            <div className="value">
                                <div className="col-md-1">{i + 1}</div>
                                <div className="col-md-7">{fileName}</div>
                                <div className="col-md-1">
                                    {fileSize / 1000 > 1000 ? (fileSize / 1000000).toFixed(2) + " MB" : (fileSize / 1000).toFixed(2) + " KB"}
                                </div>
                                <div className="col-md-1">{file_type}</div>
                                <div className="col-md-2 options">
                                    <span onClick={() => this.showVideoDetail(v)}>详情</span>
                                    <span onClick={() => this.showModifyVideo(v)}>入库</span>
                                    <span onClick={() => this.showDeleteVideo(v)}>下架</span>
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
        this.findFileMetadata()
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
        this.setState({keyword: undefined, page: 1, activeNum: 1});
        this.loadFileMetadata(1);
    }

    render() {
        const { data, page, count, total, errorMsg = "" } = this.state;
        return (
            <div className="main">

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
                            <div>上一页</div>
                            <div>下一页</div>
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