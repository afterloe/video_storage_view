"use strict";

class PlayerVideoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <main className="container" style={{"padding-top": "8rem"}}>
                <div className="row">
                    <div className="return_bar">
                        <span className="back_btn"> {" <- "} 返回上一页 </span>
                        <span className="time pull-right">2020-01-23 13:44:23</span>
                    </div>
                </div>
                <div className="row">
                    <div className="screen">
                        <video width="100%" controls>
                            <source src="https://www.runoob.com/try/demo_source/mov_bbb.mp4" type="video/mp4"/>
                        </video>
                    </div>
                </div>
                <div className="video-describe">
                    <div className="detail">
                        <span className="title">送你一朵小红花</span>
                        <span className="like">点赞数: 289598</span>
                        <span className="player-count">播放量: 289598</span>
                    </div>
                    <p className="describe">
                        《送你一朵小红花》是由韩延执导，易烊千玺、刘浩存领衔主演，朱媛媛、高亚麟主演，夏雨特别出演，岳云鹏友情出演
                        的剧情片，于2020年12月31日上映。 该片围绕两个抗癌家庭的两组生活轨迹，讲述了一个温情的现实故事，思考和
                        直面了每一个普通人都会面临的人生命题。
                    </p>
                </div>
                <div className="recommend">
                    <div className="item">
                        <div className="screenshot">
                            <img src="/video-storage/images/img_1.png" alt="screenshot"/>
                        </div>
                        <div className="detail">
                            <div className="title">送你一朵小红花</div>
                            <div className="describe">
                                《送你一朵小红花》是由韩延执导，易烊千玺、刘浩存领衔主演，朱媛媛、高亚麟主演，夏雨特别出演，岳云鹏友情出演
                                的剧情片，于2020年12月31日上映。 该片围绕两个抗癌家庭的两组生活轨迹，讲述了一个温情的现实故事，思考和
                                直面了每一个普通人都会面临的人生命题。
                            </div>
                            <div className="bar">
                                <span className="like">点赞数: 289598</span>
                                <span className="player-count">播放量: 289598</span>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="screenshot">
                            <img src="/video-storage/images/img_1.png" alt="screenshot"/>
                        </div>
                        <div className="detail">
                            <div className="title">送你一朵小红花</div>
                            <div className="describe">
                                《送你一朵小红花》是由韩延执导，易烊千玺、刘浩存领衔主演，朱媛媛、高亚麟主演，夏雨特别出演，岳云鹏友情出演
                                的剧情片，于2020年12月31日上映。 该片围绕两个抗癌家庭的两组生活轨迹，讲述了一个温情的现实故事，思考和
                                直面了每一个普通人都会面临的人生命题。
                            </div>
                            <div className="bar">
                                <span className="like">点赞数: 289598</span>
                                <span className="player-count">播放量: 289598</span>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="screenshot">
                            <img src="/video-storage/images/img_1.png" alt="screenshot"/>
                        </div>
                        <div className="detail">
                            <div className="title">送你一朵小红花</div>
                            <div className="describe">
                                《送你一朵小红花》是由韩延执导，易烊千玺、刘浩存领衔主演，朱媛媛、高亚麟主演，夏雨特别出演，岳云鹏友情出演
                                的剧情片，于2020年12月31日上映。 该片围绕两个抗癌家庭的两组生活轨迹，讲述了一个温情的现实故事，思考和
                                直面了每一个普通人都会面临的人生命题。
                            </div>
                            <div className="bar">
                                <span className="like">点赞数: 289598</span>
                                <span className="player-count">播放量: 289598</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="line"/>
            </main>
        );

    }
}
