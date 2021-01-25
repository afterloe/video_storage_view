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
                        <li>服务热线：0755-26403026</li>
                        <li>交流群：8576848</li>
                        <li>公众号：LeechBox</li>
                    </ul>
                    <ul className="left ul_two">
                        <li>支持</li>
                        <li><a href="#">咨询反馈</a></li>
                        <li><a href="/application">获取蚂蟥软件集</a></li>
                    </ul>
                    <ul className="left ul_two">
                        <li>更多</li>
                        <li><a href="/">蚂蟥系统官网</a></li>
                        <li><a href="#" target="_Blank">开发者社区</a></li>
                    </ul>
                    <div className="right">
                        <figure>
                            <figcaption>下载移动版</figcaption>
                            <img src="images/1477960940.png" alt="" style={{"width":"205px", "height": "205px"}}/>
                        </figure>
                    </div>
                    <div className="right1">
                        <figure>
                            <figcaption>微信公众号</figcaption>
                            <img src="images/1472722615.png" alt="" />
                        </figure>
                    </div>
                </div>
            </footer>
        )
    }
}