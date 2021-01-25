"use strict";

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="homeView">
                <div className="wrap0">
                    <div className="banner">
                        <ul id="outer0" className="outer_0">
                            <li className="outer0 ani">
                                <p className="container">
                                    <span>
                                        <img src="images/video.png" alt=""/>
                                        <img src="images/The aperture.png" alt=""/>
                                        <img src="images/Light spot.png" alt=""/>
                                        <img src="images/personalise.png" alt=""/>
                                    </span>
                                    <span>基于人工智能技术的视频推荐技术</span>
                                    <span>
                                        <img src="images/line.png" alt=""/>
                                    </span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="wrap1">
                    <div class="container">
                        <div class="row r_first">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <p>视频终端</p>
                            </div>
                        </div>
                        <div class="row r_two">
                            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                <p class="h_title">直播</p>
                                <p class="h_content">各路大咖hls视频直播，全终端支持</p>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                <p class="h_title">点播</p>
                                <p class="h_content">电影分级分类检索点播</p>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                <p class="h_title">推荐</p>
                                <p class="h_content">依据观看'口味'自动推荐相似视频</p>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                <p class="h_title">带货</p>
                                <p class="h_content">直播带货，选择hls直接推送</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
