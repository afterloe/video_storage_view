"use strict";

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("token"),
            user: JSON.parse(localStorage.getItem("who")),
            showDocMenu: false,
            showIconMenu: false,
        };
        this.clickMenu = this.clickMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.clickIconMenu = this.clickIconMenu.bind(this);
        this.closeIconMenu = this.closeIconMenu.bind(this);
        this.closeAllMenu = this.closeAllMenu.bind(this);
        this.cancellation = this.cancellation.bind(this);
    }

    componentDidMount() {
        let that = this;
        Req({
            method: "GET",
            url: "/backend/aip/user/ping",
        }).catch(({code, message}) => {
            if (401 === code) {
                that.setState(() => ({
                    token: null,
                    user: null,
                }));
            }
        });

        Req({
            method: "GET",
            url: "/backend/dictionary/video/type?dictionaryType=video_storage",
        }).then(value => that.setState({videoStorage: value}));
    }

    toMyApp() {
        window.location.href = "/video-storage/personal.html";
    }

    closeAllMenu(e) {
        this.setState(() => ({
            showDocMenu: false,
            showIconMenu: false
        }));
    }

    clickMenu() {
        this.setState(state => ({
            showDocMenu: !state.showDocMenu
        }));
    }

    closeMenu(e) {

        // this.setState(() => ({
        //     showDocMenu: false
        // }));
    }

    clickIconMenu() {
        this.setState(state => ({
            showIconMenu: !state.showIconMenu
        }));
    }

    closeIconMenu() {
        this.setState(() => ({
            showIconMenu: false
        }));
    }

    cancellation() {
        let that = this;
        localStorage.removeItem("token");
        localStorage.removeItem("who");
        that.setState(() => ({
            token: null,
            tenant: null,
        }));
        Req({
            method: "DELETE",
            url: "/backend/aip/user/cancellation",
        }).then(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("who");
            that.setState(() => ({
                token: null,
                tenant: null,
            }));
        }).catch(({code, message}) => {
            if (401 === code) {
                that.setState(() => ({
                    token: null,
                    tenant: null,
                }));
            }
        });
    }

    forwardPage = e => {
        const url = e.target.getAttribute("data");
        if (null != url) {
            window.location.href = url;
        }
    }

    renderTenantInfo() {
        const {token, user = {}, showIconMenu} = this.state;
        return token ? (
            <span>
                <li className="two" onClick={this.clickIconMenu} onBlur={this.closeIconMenu}>
                    <span className="name">{user.nickname}</span>
                </li>
                <div className="wCard" style={{"display": showIconMenu ? "block" : "none"}}>
                    <div className="e"></div>
                    <div className="card">
                        <p className="p_1"> {user.mail}</p>
                        <p className="p_2"> V2 会员 </p>
                        <div className="p_3">
                            <span className="fl p_3L " id="p_3L" onClick={this.toMyApp}>播放历史</span>
                            <span className="p_3R " id="p_3R" style={{"margin-left": "65px"}}> 我的视频</span>
                        </div>
                        <div className="p_4">
                            <span className="p_3R" onClick={this.cancellation}>退出登录</span>
                        </div>
                    </div>
                </div>
            </span>
        ) : (
            <li className="first">
                <a href="./login.html" className="a_href">登录</a> |
                <a href="./register.html" className="a_href">注册</a>
            </li>
        );
    }

    render() {
        const {showDocMenu, videoStorage = []} = this.state
        const activeCode = this.props.acrive_code || 0;
        return (
            <header className="navbar navbar-default navbar-fixed-top">
                <div className="container container-fluid">
                    <div className="navbar-header">
                        <a href="/video-storage" className="navbar-brand">
                            <img src="images/logo_with_word.png"/>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-left">
                            <li className={0 === activeCode ? "active" : ""}><a href="/video-storage"
                                                                                className="a_href">首页</a></li>
                            <li className={1 === activeCode ? "active" : ""}><a href="#" className="a_href">直播</a></li>
                            <li className={2 === activeCode ? "dropdown active" : "dropdown"} onClick={this.clickMenu}>
                                <a className="dropdown-toggle a_href" href="#">
                                    视频库 <span className="caret"/>
                                </a>
                                <ul className="wCard"
                                    style={{"display": showDocMenu ? "block" : "none", "margin-top": "6px"}}>
                                    <div className="e"/>
                                    <div className="card" onClick={this.forwardPage}>
                                        {
                                            videoStorage? videoStorage.map(({name, data}) => (<p className="p_2" data={data}> {name}</p>)): ""
                                        }
                                    </div>
                                </ul>
                            </li>
                            <li className={3 === activeCode ? "active" : ""}><a href="/video-storage/pics.html"
                                                                                className="a_href">图像库</a></li>
                            <li className={4 === activeCode ? "active" : ""}><a href="/video-storage/books.html"
                                                                                className="a_href">在线小说</a></li>
                            <li className={5 === activeCode ? "active" : ""}><a href="/video-storage/tools.html"
                                                                                className="a_href">管理工具</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {this.renderTenantInfo()}
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}