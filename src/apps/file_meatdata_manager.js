"use strict";

/**
 * 元数据管理
 */
class FileMeatdataManagerApp extends React.Component {
    constructor(prots) {
        super(prots);
        this.state = {
            page: 1,
            count: 100,
            viewContentHTML: (<div className="no-value">未有信息显示</div>)
        };

        this.loadFileMeatdata = this.loadFileMeatdata.bind(this);
        this.clickPageItem = this.clickPageItem.bind(this);
        this.inputKeyword = this.inputKeyword.bind(this);
        this.enterEnter = this.enterEnter.bind(this);
    }

    componentDidMount() {
        const { page, count } = this.state;
        this.loadFileMeatdata(page, count);
    }

    loadFileMeatdata(page, count) {
        const that = this;
        Req({
            method: "GET",
            url: `/backend/aip/meatdata/all?page=${page}&count=${count}`,
        }).then(value => {
            const { total, data = [] } = value;
            that.setState({
                total,
                data
            });
        }).catch(({ code, message }) => {
            checkErrorCode(code);
            that.setState({
                viewContentHTML: (<div className="no-value">{message}</div>)
            });
        });
    }

    renderFileMeatdataList(data = []) {
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
                    }) : (<span className="no-value">未上架视频</span>)}
                </div>
            </div>
        );
    }

    inputKeyword(event) {
        this.setState({keyword: event.target.value});
    }

    enterEnter(event) {
        if (event.keyCode !== 13) {
            return;
        }
        const {keyword, count} = this.state;
        Req({
            method: "GET",
            url: `/backend/aip/meatdata/search?keyword=${keyword}&page=1&count=${count}`,
        }).then(value => {
            const { total, data = [] } = value;
            that.setState({
                total,
                data
            });
        }).catch(({ code, message }) => {
            checkErrorCode(code);
            that.setState({
                viewContentHTML: (<div className="no-value">{message}</div>)
            });
        });
    }

    clickPageItem(activeNum = 0) {
        const { count } = this.state;
        this.setState({
            page: activeNum
        });
        this.loadFileMeatdata(activeNum, count)
    }

    render() {
        const { data, page, count, total } = this.state;
        return (
            <div className="main">

                <div className="top">
                    <div className="title">元数据管理</div>
                    <div className="bar">
                        <div>
                            <div>统计分类</div>
                            <div>视频库</div>
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
                {this.renderFileMeatdataList(data)}
                <div className="view">
                    <PageComponent position="pull-left" activeNum={page} docCount={count}
                        total={total} clickPageCallback={this.clickPageItem} />
                </div>
            </div>
        );
    }
}