"use strict";

class StorageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bg: bgColor[Math.round(Math.random() * 8)],
            target: getTarget("type") || "hot",
        };
        this.playerVideo = this.playerVideo.bind(this);
    }

    playerVideo = e => {
        // const url = e.target.getAttribute("data");
        // if (null != url) {
        //     window.location.href = url;
        // } else {
        //     // TODO
        window.location.href = "/video-storage/player.html?uuid=5a9db40b-3b0e-4814-9489-831d0f4e389c";
        // }
    }

    generatorTitle = target => {
        if (target === "hot") {
            return (
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
            );
        } else if (target === "movie") {
            return (
                <div className="lh-100">
                    <h4 className="mb-0 text-white lh-100">电影</h4>
                    <small> </small>
                </div>
            )
        } else if (target === "tv") {
            return (
                <div className="lh-100">
                    <h4 className="mb-0 text-white lh-100">电视剧</h4>
                    <small> </small>
                </div>
            )
        } else if (target === "comic") {
            return (
                <div className="lh-100">
                    <h4 className="mb-0 text-white lh-100">动漫</h4>
                    <small> </small>
                </div>
            )
        }
    }

    clickPage = (event) => {
        const clickNum = event.target.getAttribute("data-reflect") || 1;
        // this.loadFormRemote(clickNum);
    }

    render = () => {
        const {bg, target} = this.state;
        return (
            <main className="container" style={{"padding-top": "7rem"}}>
                <div className="d-flex align-items-center p-3 my-3 text-white-50 rounded shadow-sm"
                     style={{"background-color": bg}}>
                    {this.generatorTitle(target)}
                </div>
                <div className="my-3 p-3 bg-white rounded shadow-sm video-list">

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="video" onClick={this.playerVideo}>
                                <div className="title" style={{"background-color": bgColor[0]}}>
                                    送你一朵小红花
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
                                        《送你一朵小红花》是由韩延执导，易烊千玺、刘浩存领衔主演，朱媛媛、高亚麟主演，夏雨特别出演，岳云鹏友情出演
                                        的剧情片，于2020年12月31日上映。 该片围绕两个抗癌家庭的两组生活轨迹，讲述了一个温情的现实故事，思考和
                                        直面了每一个普通人都会面临的人生命题。
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
                        <div className="col-lg-4">
                            <div className="video">
                                <div className="title">
                                    送你一朵小红花
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
                                        《送你一朵小红花》是由韩延执导，易烊千玺、刘浩存领衔主演，朱媛媛、高亚麟主演，夏雨特别出演，岳云鹏友情出演
                                        的剧情片，于2020年12月31日上映。 该片围绕两个抗癌家庭的两组生活轨迹，讲述了一个温情的现实故事，思考和
                                        直面了每一个普通人都会面临的人生命题。
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
                        <div className="col-lg-4">
                            <div className="video">
                                <div className="title">
                                    送你一朵小红花
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
                                        《送你一朵小红花》是由韩延执导，易烊千玺、刘浩存领衔主演，朱媛媛、高亚麟主演，夏雨特别出演，岳云鹏友情出演
                                        的剧情片，于2020年12月31日上映。 该片围绕两个抗癌家庭的两组生活轨迹，讲述了一个温情的现实故事，思考和
                                        直面了每一个普通人都会面临的人生命题。
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
                        <div className="col-lg-4">
                            <div className="video">
                                <div className="title">
                                    送你一朵小红花
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
                                        《送你一朵小红花》是由韩延执导，易烊千玺、刘浩存领衔主演，朱媛媛、高亚麟主演，夏雨特别出演，岳云鹏友情出演
                                        的剧情片，于2020年12月31日上映。 该片围绕两个抗癌家庭的两组生活轨迹，讲述了一个温情的现实故事，思考和
                                        直面了每一个普通人都会面临的人生命题。
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
                    </div>
                </div>
            </main>
        );

    }
}