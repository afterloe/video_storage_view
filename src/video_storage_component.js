"use strict";

class StorageView extends React.Component {

    constructor(props) {
        super(props);
    }

    playerVideo = video => {
        const {id} = video;
        Req({
            method: "GET",
            url: "/backend/aip/video/player?id=" + id,
        }).then(value => {
            localStorage.setItem("video", JSON.stringify(video));
            localStorage.setItem("src", value + "");
            window.location.href = "/video-storage/player.html?movie="+guid2();
        }).catch(({msg}) => alert(msg));
    }

    render = () => {
        const {background, videoList = []} = this.props;
        return (
            <main className="container" style={{"padding-top": "7rem"}}>
                <div className="d-flex align-items-center p-3 my-3 text-white-50 rounded shadow-sm"
                     style={{"background-color": background}}>
                    <div className="lh-100">
                        <h4 className="storage-title">热度推荐</h4>
                        <div style={{height: "3rem", "line-height": "3rem"}}>
                            <div className={"pull-left item-list"}>
                                <small>点播热度</small>
                                <small>评论数</small>
                                <small>点赞数</small>
                            </div>
                            <div className={"pull-right search-group"}>
                                <input placeholder="搜索你的最爱" autoComplete="off" className={"search-view"}/>
                                <span className={"search-btn"}>搜索</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-3 p-3 bg-white rounded shadow-sm video-list">
                    <div className="row">
                        {videoList ? videoList.map(video => {
                            const {title = "", describe = "", id} = video;
                            return (
                                <div className="col-lg-4">
                                    <div className="video" onClick={e => this.playerVideo(video)}>
                                        <div className="title" style={{"background-color": bgColor[3]}}>
                                            {title}
                                        </div>
                                        <div className="detail">
                                            <div className="screenshot">
                                                <div className="last"/>
                                                <div className="image">
                                                    <img src="/video-storage/images/img_1.png" alt="screenshot"/>
                                                </div>
                                                <div className="next"/>
                                            </div>
                                            <div className="describe">
                                                {describe}
                                            </div>
                                            <p className="update">
                                                <span className="line"/>
                                                <div className="func">
                                                    <small>点赞数: 289598</small>
                                                    <small>评论数: 289598</small>
                                                    <small>播放量: 289598</small>
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