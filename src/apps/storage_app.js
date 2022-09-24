"use strict";


class StorageView extends React.Component {

    constructor(props) {
        super(props);
    }

    playerVideo = video => {
        const { virtual_path, file_type, id } = video;
        Req({
            method: "GET",
            url: "/backend/aip/video/player?id=" + id,
        }).then(value => {
            localStorage.setItem("video", JSON.stringify(video));
            localStorage.setItem("src", SYSCFG[0] + "/" + virtual_path);
            window.location.href = "/video-storage/player.html?movie=" + guid2();
        }).catch(({ msg }) => alert(msg));
    }

    render = () => {
        const { background, videoList = [] } = this.props;
        return (
            <main className="container" style={{ "padding-top": "7rem" }}>
                <div className="d-flex align-items-center p-3 my-3 text-white-50 rounded shadow-sm"
                    style={{ "background-color": background }}>
                    <div className="lh-100">
                        <h4 className="storage-title">热度推荐</h4>
                        <div style={{ height: "3rem", "line-height": "3rem" }}>
                            <div className={"pull-left item-list"}>
                                <small>点播热度</small>
                                <small>评论数</small>
                                <small>点赞数</small>
                            </div>
                            <div className={"pull-right search-group"}>
                                <input placeholder="搜索你的最爱" autoComplete="off" className={"search-view"} />
                                <span className={"search-btn"}>搜索</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-3 p-3 bg-white rounded shadow-sm video-list">
                    <div className="row">
                        {videoList ? videoList.map(video => {
                            const { fileName, virtual_path, duration, height, width, file_type } = video;
                            return (
                                <div className="col-lg-4">
                                    <div className="video" onClick={e => this.playerVideo(video)}>
                                        <div className="title" style={{ "background-color": bgColor[3] }}>
                                            {fileName}
                                        </div>
                                        <div className="detail">
                                            <div className="screenshot">
                                                <div className="image">
                                                    <img src={SYSCFG[1] + "/" + virtual_path + ".jpg"} alt="screenshot" />
                                                </div>
                                            </div>
                                            <p className="update">
                                                <span className="line" />
                                                <div className="func">
                                                    <small>类型: {file_type}</small>
                                                    <small>分辨率: {width}*{height}</small>
                                                    <small>时长: {Math.ceil(duration)} 秒</small>
                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : (<span>暂未有视频上架</span>)}
                    </div>
                </div>
            </main>
        );

    }
}

class StorageApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bg: bgColor[Math.round(Math.random() * 8)],
            target: getTarget("type") || "hot",
            page: 1,
            count: 25
        };
        this.clickPageItem = this.clickPageItem.bind(this);
    }

    componentDidMount() {
        this.loadVideoList();
    }

    loadVideoList(activeNum) {
        const that = this;
        const { target, page, count } = that.state;
        Req({
            method: "GET",
            url: `/backend/aip/video/list?type=${target}&page=${page}&count=${count}`,
        }).then(({ total, data = [] }) => {
            that.setState({ total, data, errorMsg: "", page: activeNum })
        }).catch(({ code, message }) => {
            checkErrorCode(code);
            that.setState({ errorMsg: message });
        });
    }

    clickPageItem(activeNum = 0) {
        const { page } = this.state;
        if (page == activeNum) {
            return;
        }
        this.setState({ page: activeNum });
        this.loadVideoList(activeNum);
    }

    render() {
        const { data, page, count, total, bg } = this.state
        return (
            <div>
                <HeaderComponent acrive_code={2} showDocMenu={this.state.showDocMenu} />
                <StorageView videoList={data} background={bg} />
                <PageComponent position="pull-right" activeNum={page} docCount={count} total={total}
                    clickPageCallback={this.clickPageItem} />
            </div>
        );
    }
}

ReactDOM.render(<StorageApp theme="dark" />, document.getElementById("app"));
