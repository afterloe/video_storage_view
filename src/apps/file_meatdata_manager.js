"use strict";

/**
 * 元数据管理
 */
class FileMeatdataManagerApp extends React.Component {
    constructor(prots) {
        super(prots);
        this.state = {
            viewContentHTML: (<div className="no-value">未有信息显示</div>)
        };
        this.clickPageItem = this.clickPageItem.bind(this);
    }

    componentDidMount() {
        this.renderFileMeatdataList();
    }

    renderFileMeatdataList() {
        const that = this;
        const { page = 0, count = 10 } = this.state;
        Req({
            method: "GET",
            url: `/backend/aip/meatdata/all?page=${page}&count=${count}`,
        }).then(value => {
            const { total, data = [] } = value;
            that.setState({
                total,
                docCount: data ? data.length : 0,
                viewContentHTML: (
                    <div className="view">
                        <div className="title">
                            <div className="col-md-1"></div>
                            <div className="col-md-5">名称</div>
                            <div className="col-md-2">大小</div>
                            <div className="col-md-2">类型</div>
                            <div className="col-md-2">操作</div>
                        </div>
                        <div className="values">
                            {data ? data.map((v, i) => {
                                const { fileName, fileSize, file_type } = v;
                                return (
                                    <div className="value">
                                        <div className="col-md-1">{i + 1}</div>
                                        <div className="col-md-5">{fileName}</div>
                                        <div
                                            className="col-md-2">{fileSize / 1000 > 1000 ? size / 1000000 + " MB" : fileSize / 1000 + " KB"}</div>
                                        <div className="col-md-2">{file_type}</div>
                                        <div className="col-md-2 options">
                                            <span onClick={() => this.showVideoDetail(v)}>详情</span>
                                            <span onClick={() => this.showModifyVideo(v)}>修改</span>
                                            <span onClick={() => this.showDeleteVideo(v)}>下架</span>
                                        </div>
                                    </div>)
                            }) : (<span className="no-value">未上架视频</span>)}
                        </div>
                    </div>
                )
            });
        }).catch(({ code, message }) => {
            checkErrorCode(code);
        });
    }

    clickPageItem(activeNum = 0) {
        this.setState({
            page: activeNum
        });
        this.renderFileMeatdataList();
    }

    render() {
        const { viewContentHTML = "", page = 0, docCount = 10, total = 10} = this.state;
        return (
            <div className="main">

                <div className="top">
                    <div className="title">元数据管理</div>
                    <div className="bar">
                        <div>
                            <div>统计分类</div>
                            <div>视频库</div>
                        </div>
                    </div>
                </div>
                {viewContentHTML}
                <div className="view">
                    <PageComponent position="pull-left" activeNum={page} docCount={docCount}
                        total={total}
                        clickPageCallback={this.clickPageItem} />
                </div>
            </div>
        );
    }
}