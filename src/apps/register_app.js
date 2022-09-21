"use strict";

/**
 * 用户注册
 */
class RegisterUserApp extends React.Component {

    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputFirstPwd = this.inputFirstPwd.bind(this);
        this.inputSecondPwd = this.inputSecondPwd.bind(this);
        this.checkSecondPwd = this.checkSecondPwd.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPwd = this.checkPwd.bind(this);
        this.mailRegex = /^[a-zA-Z0-9\+\.\_\%\-\+]{1,256}\@[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\-]{0,25})$/;
        this.state = {};
    }

    checkEmail() {
        const {email} = this.state;
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
        const {pwd} = this.state;
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

    checkSecondPwd() {
        const {secondPwd, pwd} = this.state;
        if ("" === secondPwd || pwd != secondPwd) {
            this.setState(() => ({err: "两次密码不一致 "}));
        } else {
            this.setState(() => ({err: null}));
        }
    }

    inputEmail(event) {
        this.setState({email: event.target.value});
    }

    inputFirstPwd(event) {
        this.setState({pwd: event.target.value});
    }

    inputSecondPwd(event) {
        this.setState({secondPwd: event.target.value});
    }

    register() {
        const {email, pwd, secondPwd, err} = this.state;
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
        if (pwd != secondPwd) {
            this.setState(() => ({
                err: "两次密码不一致!"
            }));
            return
        }
        let that = this;
        Req({
            method: "PUT",
            url: "/backend/signup",
            data: {email, password: pwd}
        }).then(data => {
            alert("注册成功！");
            window.location.href = "/video-storage/login.html";
        }).catch(({msg}) => {
            that.setState({err: msg});
        });
    }

    render() {
        let { err } = this.state;
        return (
            <div className="wrap">
                <div className="row">
                    <div className="form-horizontal center-block form_login" id="fm" style={{ "text-align": "center" }}>
                        <div className="form-group">
                            <div className="col-md-12 col-sm-12 col-sm-12 radius">
                                <input type="email" id="userName" onChange={this.inputEmail} onBlur={this.checkEmail} aria-describedby="emailHelp"
                                    placeholder="请输入邮箱"
                                    autoComplete="off" />
                            </div>
                        </div>
                        <div className="error">
                            <span style={err == null ? { "display": "none" } : { "display": "block" }} id="error">{err}</span>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12 col-sm-12 col-sm-12 radius">
                                <input type="password" id="firstPassword" placeholder="请输入密码" autoComplete="off"
                                    name="password" onChange={this.inputFirstPwd} onBlur={this.checkPwd} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12 col-sm-12 col-sm-12 radius">
                                <input type="password" id="secondPassword" placeholder="二次确认密码" autoComplete="off"
                                    name="password" onChange={this.inputSecondPwd} onBlur={this.checkSecondPwd} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12 col-sm-12 col-sm-12 radius last">
                                <button id="btn" onClick={this.register} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <small className="text-muted" style={{ "text-align": "center", "margin-top": "155px", "color": "#00008b" }}>
                        <a href="/video-storage"> {" <- "} 返回首页 </a>
                    </small>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<RegisterUserApp />, document.getElementById("app"));