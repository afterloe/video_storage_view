"use strict";

class HomePageApp extends React.Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputPwd = this.inputPwd.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPwd = this.checkPwd.bind(this);
        this.autoPost = this.autoPost.bind(this);
        this.mailRegex = /^[a-zA-Z0-9\+\.\_\%\-\+]{1,256}\@[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\-]{0,25})$/;
        this.state = {};
    }

    autoPost(e) {
        const key = e.keyCode;
        if (13 === key) {
            this.signIn()
        }
    }

    checkEmail() {
        let {email} = this.state;
        if (!this.mailRegex.test(email)) {
            this.setState(() => ({
                err: "请输入正确的邮箱!"
            }));
        } else {
            this.setState(() => ({
                err: null
            }));
        }
    }

    checkPwd() {
        let {pwd} = this.state;
        if ("" === pwd) {
            this.setState(() => ({
                err: "请输入密码!"
            }));
        } else {
            this.setState(() => ({
                err: null
            }));
        }
    }

    signIn() {
        let {email, pwd, err} = this.state;
        if (!this.mailRegex.test(email)) {
            this.setState(() => ({
                err: "请输入正确的邮箱!"
            }));
            return
        }
        if (pwd == null || pwd.length === 0) {
            this.setState(() => ({
                err: "请输入密码!"
            }));
            return
        }
        let that = this;
        Req({
            method: "POST",
            url: "/king-core/signin",
            data: {email, password: pwd}
        }).then(data => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("who", JSON.stringify(data.tenant));
            let lastPage = sessionStorage.getItem("lastPage");
            if (lastPage !== "" && null !== lastPage) {
                window.location.href = lastPage;
                sessionStorage.removeItem("lastPage");
            } else {
                window.location.href = "/console.html";
            }
        }).catch( ({msg}) => {
            that.setState({err: msg});
        });
    }

    inputEmail(event) {
        this.setState({email: event.target.value});
    }

    inputPwd(event) {
        this.setState({pwd: event.target.value});
    }

    render() {
        let {err} = this.state;
        return (
            <div className="wrap">
                <div className="row">
                    <div className="col-md-6" style={{"text-align": "right"}}>
                        <img className="login_logo" src="images/login_logo.png" alt=""/>
                    </div>
                    <div className="col-md-6" onKeyDown={this.autoPost}>
                        <div className="">
                            <div className="form-horizontal form_login" id="fm">
                                <div className="form-group">
                                    <div className="col-md-12 col-sm-12 col-sm-12 radius">
                                        <input type="email" id="userName" onChange={this.inputEmail} onBlur={this.checkEmail} aria-describedby="emailHelp"
                                               placeholder="请输入邮箱"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="error">
                                    <span style={err == null ? {"display": "none"}: {"display": "block"}} id="error">{err}</span>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12 col-sm-12 col-sm-12 radius">
                                        <input type="password" id="userPassword" placeholder="请输入密码" autoComplete="off"
                                               name="password" onChange={this.inputPwd} onBlur={this.checkPwd}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12 col-sm-12 col-sm-12">
                                        <small className="text-muted">
                                            <a href="#"/> 忘记密码
                                        </small>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12 col-sm-12 col-sm-12 radius last">
                                        <button id="btn" onClick={this.signIn}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <small className="text-muted" style={{"text-align": "center", "margin-top": "155px", "color": "#00008b"}}>
                        <a href="/video-storage"> {" <- "} 返回首页 </a>
                    </small>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<HomePageApp/>, document.getElementById("app"));