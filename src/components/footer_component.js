"use strict";

class FooterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <footer className="wrap7">
                <div className="footer">
                    <ul className="left ul_first">
                        <li>服务热线：0790-6289511</li>
                        <li>交流群：1234567</li>
                        <li>公众号：video_storage01</li>
                    </ul>
                    <ul className="left ul_two">
                        <li>支持</li>
                        <li><a href="#">咨询反馈</a></li>
                        <li><a href="/application">获取最新软件集</a></li>
                    </ul>
                    <ul className="left ul_two">
                        <li>更多</li>
                        <li><a href="https://github.com/afterloe/video_storage_view">开源代码</a></li>
                        <li><a href="https://github.com/afterloe" target="_Blank">开发者社区</a></li>
                    </ul>
                    <div className="right">
                        <figure>
                            <figcaption>QQ</figcaption>
                            <img src="images/1477960940.jpeg" alt="" style={{"width":"205px", "height": "205px"}}/>
                        </figure>
                    </div>
                    <div className="right1">
                        <figure>
                            <figcaption>微信号</figcaption>
                            <img src="images/1472722615.jpeg" alt="" style={{"width":"205px", "height": "205px"}}/>
                        </figure>
                    </div>
                </div>
            </footer>
        )
    }
}