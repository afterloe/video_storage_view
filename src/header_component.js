"use strict";

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("token"),
            tenant: localStorage.getItem("who"),
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
            url: "/king-core/aip/tenant/ping",
        }).catch(({code, message}) => {
            if (401 === code) {
                that.setState(() => ({
                    token: null,
                    tenant: null,
                }));
            } else {
                // alert(message);
            }
        });
    }

    toMyApp() {
        window.location.href = "/console.html";
    }

    closeAllMenu() {
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

    closeMenu() {
        this.setState(() => ({
            showDocMenu: false
        }));
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
        Req({
            method: "DELETE",
            url: "/king-core/aip/tenant/cancellation",
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
            } else {
                alert(message);
            }
        });
    }

    renderTenantInfo() {
        const {token, showIconMenu} = this.state;
        return token ? (
            <span>
                <li className="two" onClick={this.clickIconMenu} onBlur={this.closeIconMenu}>
                    <a href="#" className="personPic">
                        <img className="img-circle" alt="140x140"
                             src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzE0MHgxNDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNzQxYmFjNzc4NCB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE3NDFiYWM3Nzg0Ij48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA0Njg3NSIgeT0iNzQuNSI+MTQweDE0MDwvdGV4dD48L2c+PC9nPjwvc3ZnPg=="/>

                    </a>
                    <span href="#" className="name">afterloe</span>
                </li>
                <div className="wCard" style={{"display": showIconMenu? "block": "none"}}>
                    <div className="e"></div>
                    <div className="card">
                        <p className="p_1"> afterloe</p>
                        <p className="p_2"> 13266548013 </p>
                        <div className="p_3">
                            <span className="fl p_3L " id="p_3L" onClick={this.toMyApp}>我的应用</span>
                            <span className="p_3R " id="p_3R" style={{"margin-left":"65px"}}> 我的设备</span>
                        </div>
                        <div className="p_4">
                            <span className="p_3R" onClick={this.cancellation}>退出</span>
                        </div>
                    </div>
                </div>
            </span>
        ) : (
            <li className="first">
                <a href="/login.html" className="a_href">登录</a>
            </li>
        );
    }

    render() {
        const {showDocMenu} = this.state
        return (
            <header className="navbar navbar-default navbar-fixed-top" onBlur={this.closeAllMenu}>
                <div className="container container-fluid">
                    <div className="navbar-header">
                        <a href="/" className="navbar-brand">
                            <img src="images/logo_with_word.png"/>
                        </a>
                    </div>

                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-left">
                            <li><a href="/" className="a_href">首页</a></li>
                            <li><a href="#" className="a_href">产品演示</a></li>
                            <li><a href="#" className="a_href">资源库</a></li>
                            <li className="dropdown" onClick={this.clickMenu} onBlur={this.closeMenu}>
                                <a className="dropdown-toggle a_href" href="#">
                                    文档材料 <span className="caret"/>
                                </a>
                                <ul className="wCard" style={{"display": showDocMenu? "block": "none", "margin-top": "6px"}}>
                                    <div className="e"></div>
                                    <div className="card">
                                        <p className="p_2"> 设计文档</p>
                                        <p className="p_2"> 解决方案</p>
                                        <p className="p_3"> 产品说明书</p>
                                        <p className="p_2"> 关键技术参数</p>
                                    </div>
                                </ul>
                            </li>
                            <li><a href="#" className="a_href">关于团队</a></li>
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