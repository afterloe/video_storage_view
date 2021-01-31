"use strict";

class VideoManagerApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className="main">
                <div className="top">
                    <div className="title">视频管理</div>
                    <div className="bar">
                        <div>
                            <div>指定扫描</div>
                            <div>上新</div>
                        </div>
                    </div>
                </div>
                <div className="view">
                    <div className="title">
                        <div className="col-md-1"></div>
                        <div className="col-md-3">名称</div>
                        <div className="col-md-2">类型</div>
                        <div className="col-md-2">大小</div>
                        <div className="col-md-2">时长</div>
                        <div className="col-md-2">操作</div>
                    </div>
                    <div className="values">
                        <div className="value">
                            <div className="col-md-1">1</div>
                            <div className="col-md-3">送一朵小红花</div>
                            <div className="col-md-2">video/mp4</div>
                            <div className="col-md-2">1932 MB</div>
                            <div className="col-md-2">104.22 分钟</div>
                            <div className="col-md-2 options">
                                <span>删除</span>
                                <span>修改</span>
                                <span>下架</span>
                            </div>
                        </div>
                        <div className="value">
                            <div className="col-md-1">2</div>
                            <div className="col-md-3">送一朵小红花</div>
                            <div className="col-md-2">video/mp4</div>
                            <div className="col-md-2">1932 MB</div>
                            <div className="col-md-2">104.22 分钟</div>
                            <div className="col-md-2 options">
                                <span>删除</span>
                                <span>修改</span>
                                <span>下架</span>
                            </div>
                        </div>
                        <div className="value">
                            <div className="col-md-1">3</div>
                            <div className="col-md-3">送一朵小红花</div>
                            <div className="col-md-2">video/mp4</div>
                            <div className="col-md-2">1932 MB</div>
                            <div className="col-md-2">104.22 分钟</div>
                            <div className="col-md-2 options">
                                <span>删除</span>
                                <span>修改</span>
                                <span>下架</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <PageComponent position="pull-left" activeNum={1} docCount={3}/>
                    </div>
                </div>
            </div>
        );
    }
}

class InputView extends React.Component {
    constructor(props) {
        super(props);
        this.closeWindow = this.closeWindow.bind(this);
        this.inputValue = this.inputValue.bind(this);
        this.submit = this.submit.bind(this);
    }

    closeWindow = e => {
        this.props.cannel();
        this.state = {}
    }

    submit = e => {
        this.props.then(this.state);
        this.state = {}
    }

    inputValue = e => {
        const key = e.target.getAttribute("data");
        const value = e.target.value;
        const index = e.target.getAttribute("index");
        const {argsGroup = []} = this.props;
        argsGroup[index]["val"] = value;
        this.setState({[key]: value});
    }

    render = () => {
        const {showWindow = false, title = "", argsGroup = [], msg = ""} = this.props;
        return (
            <div className={showWindow ? "modal mask show" : "modal mask"}>
                <div className="content">
                    <div className="mask-header">
                        <span className="title">{title}</span>
                    </div>
                    <div className="mask-body">
                        {0 === argsGroup.length ? (<div className="no-value">{msg}</div>) : argsGroup.map(({
                                                                                                               label = "",
                                                                                                               key = "",
                                                                                                               val = "请输入参数"
                                                                                                           }, i) => (
                            <div className="input-view">
                                <label>{label}</label>
                                <input index={i} placeholder="请输入参数" value={val} data={key} onChange={this.inputValue}
                                       autoComplete="off"/>
                            </div>
                        ))}
                    </div>
                    <div className="mask-footer">
                        <div className="btn-group">
                            <span className="submit" onClick={this.submit}>确定</span>
                            <span className="cancel" onClick={this.closeWindow}>取消</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class NavConfigApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.createDictionaryGroup = this.createDictionaryGroup.bind(this);
        this.openCreateDictionaryWindow = this.openCreateDictionaryWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.loadData = this.loadData.bind(this);
        this.openModifyDictionaryWindow = this.openModifyDictionaryWindow.bind(this);
        this.openDeleteDictionaryWindow = this.openDeleteDictionaryWindow.bind(this);
        this.openAppendDictionaryWindow = this.openAppendDictionaryWindow.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let that = this;
        Req({
            method: "GET",
            url: "/backend/aip/dictionary/group",
        }).then(value => {
            that.setState({nav: value})
        }).catch(({code, message}) => {
            if (401 === code) {
                that.setState(() => ({
                    token: null,
                    who: null,
                }));
                that.setState({nav: []})
                alert("请登录")
            }
        });
    }

    renderGroupList = (dictionaryGroup = []) => dictionaryGroup.map((d, i) => {
        const {id, name, groupType, values = []} = d;
        return (
            <div>
                <div className="value" data={id}>
                    <div className="col-md-1">{i + 1}</div>
                    <div className="col-md-2">{name}</div>
                    <div className="col-md-5">{groupType}</div>
                    <div className="col-md-3 options">
                        <span index={i} onClick={this.openModifyDictionaryWindow}>修改</span>
                        <span index={i} onClick={this.openDeleteDictionaryWindow}>删除</span>
                        <span index={i} onClick={this.openAppendDictionaryWindow}>新增子级</span>
                    </div>
                </div>
                {values ? values.map((v, j) => {
                    const {id, name, data} = v;
                    return (
                        <div className="value" data={id}>
                            <div className="col-md-2">{i + 1} - {j + 1}</div>
                            <div className="col-md-2">{name}</div>
                            <div className="col-md-5">{data}</div>
                            <div className="col-md-3 options">
                                <span>修改</span>
                                <span>删除</span>
                            </div>
                        </div>
                    );
                }) : ""}
            </div>
        )
    })

    openCreateDictionaryWindow = e => this.setState({
        showCreateDictionaryGroupWindow: true,
        argsGroup: [{label: "标签组名", key: "name"}, {label: "code", key: "groupType"}]
    })

    closeWindow = e => this.setState({
        showCreateDictionaryGroupWindow: false,
        showModifyDictionaryGroupWindow: false,
        showDeleteDictionaryGroupWindow: false,
        showAppendDictionaryWindow: false
    })

    createDictionaryGroup = value => {
        let that = this;
        Req({
            method: "PUT",
            url: "/backend/aip/dictionary/group",
            data: value
        }).then(data => {
            that.loadData();
        }).catch(({msg}) => {
            that.setState({err: msg});
        });
        that.setState({showCreateDictionaryGroupWindow: false});
    }

    openModifyDictionaryWindow = e => {
        const index = e.target.getAttribute("index");
        const {nav = []} = this.state;
        const {name, groupType} = nav[index] || {};
        this.setState({
            showModifyDictionaryGroupWindow: true,
            index,
            argsGroup: [{label: "标签组名", key: "name", val: name}, {label: "code", key: "groupType", val: groupType}]
        })
    }

    modifyDictionaryGroup = value => {
        if (null == value) {
            return
        }
        const {index, nav = []} = this.state;
        const {id, name, groupType} = nav[index] || {};
        const target = Object.assign({id, name, groupType}, value)
        let that = this;
        Req({
            method: "POST",
            url: "/backend/aip/dictionary/group",
            data: target
        }).then(data => {
            that.loadData();
        }).catch(({msg}) => {
            that.setState({err: msg});
        });
        that.setState({showModifyDictionaryGroupWindow: false});
    }

    openDeleteDictionaryWindow = e => {
        const index = e.target.getAttribute("index");
        const {nav = []} = this.state;
        this.setState({
            showDeleteDictionaryGroupWindow: true,
            msg: `确定删除${nav[index].name}?`,
            index,
        });
    }

    deleteDictionaryGroup = () => {
        const {index, nav = []} = this.state;
        const {id} = nav[index] || {};
        let that = this;
        Req({
            method: "DELETE",
            url: "/backend/aip/dictionary/group?id=" + id,
        }).then(data => {
            that.loadData();
        }).catch(({msg}) => {
            that.setState({err: msg});
        });
        that.setState({showDeleteDictionaryGroupWindow: false});
    }

    openAppendDictionaryWindow = e => {
        const index = e.target.getAttribute("index");
        this.setState({
            showAppendDictionaryWindow: true,
            argsGroup: [{label: "标签组名", key: "name"}, {label: "标签值", key: "data"}],
            index,
        });
    }

    appendDictionary = value => {
        const {index, nav = []} = this.state;
        const {id} = nav[index] || {};
        Object.assign(value, {groupID: id})
        let that = this;
        Req({
            method: "PUT",
            url: "/backend/aip/dictionary",
            data: value
        }).then(data => {
            that.loadData();
        }).catch(({msg}) => {
            that.setState({err: msg});
        });
        that.setState({showAppendDictionaryWindow: false});
    }

    render = () => {
        const {
            nav = [],
            showCreateDictionaryGroupWindow = false,
            showModifyDictionaryGroupWindow = false,
            showDeleteDictionaryGroupWindow = false,
            showAppendDictionaryWindow = false,
            msg,
            argsGroup = []
        } = this.state;
        return (
            <div>
                <InputView showWindow={showCreateDictionaryGroupWindow} title="创建标签组" argsGroup={argsGroup}
                           then={this.createDictionaryGroup} cannel={this.closeWindow}/>
                <InputView showWindow={showModifyDictionaryGroupWindow} title="修改标签组" argsGroup={argsGroup}
                           then={this.modifyDictionaryGroup} cannel={this.closeWindow}/>
                <InputView showWindow={showDeleteDictionaryGroupWindow} title="删除标签组" msg={msg}
                           then={this.deleteDictionaryGroup} cannel={this.closeWindow}/>
                <InputView showWindow={showAppendDictionaryWindow} title="新增标签" argsGroup={argsGroup}
                           then={this.appendDictionary} cannel={this.closeWindow}/>
                <div className="main">
                    <div className="top">
                        <div className="title">导航配置</div>
                        <div className="bar">
                            <div>
                                <div onClick={this.openCreateDictionaryWindow}>创建导航</div>
                                <div>删除导航</div>
                            </div>
                        </div>
                    </div>
                    <div className="view">
                        <div className="title">
                            <div className="col-md-1"></div>
                            <div className="col-md-2">导航名称</div>
                            <div className="col-md-5">标签值</div>
                            <div className="col-md-3">操作</div>
                        </div>
                        <div className="values">
                            {this.renderGroupList(nav)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ToolsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderMainView = (activeCode = 0) => {
        switch (activeCode) {
            case 0:
                return <NavConfigApp/>
            case 3:
                return <VideoManagerApp/>
        }
    };

    changeView = (activeCode = 0) => {
        this.setState({activeCode});
    }

    render() {
        const {activeCode = 0} = this.state;
        return (
            <div className="tools_app">
                <div className="left_control">
                    <div>
                        <div className="title"
                             onClick={e => window.location.href = "/video-storage/index.html"}>{"<- "}返回首页
                        </div>
                    </div>
                    <div className="line"/>
                    <div>
                        <div className="title">字典</div>
                        <div onClick={e => this.changeView(0)}
                             className={activeCode === 0 ? "item active" : "item"}>导航配置
                        </div>
                        <div onClick={e => this.changeView(1)}
                             className={activeCode === 1 ? "item active" : "item"}>标签管理
                        </div>
                        <div onClick={e => this.changeView(2)}
                             className={activeCode === 2 ? "item active" : "item"}>目录配置
                        </div>
                    </div>
                    <div className="line"/>
                    <div>
                        <div className="title">内容</div>
                        <div onClick={e => this.changeView(3)}
                             className={activeCode === 3 ? "item active" : "item"}>视频管理
                        </div>
                        <div onClick={e => this.changeView(4)}
                             className={activeCode === 4 ? "item active" : "item"}>图片管理
                        </div>
                        <div onClick={e => this.changeView(5)}
                             className={activeCode === 5 ? "item active" : "item"}>小说管理
                        </div>
                        <div onClick={e => this.changeView(6)}
                             className={activeCode === 6 ? "item active" : "item"}>直播管理
                        </div>
                    </div>
                    <div className="line"/>
                    <div>
                        <div onClick={e => this.changeView(7)}
                             className={activeCode === 7 ? "item active" : "item"}>用户
                        </div>
                        <div onClick={e => this.changeView(8)}
                             className={activeCode === 8 ? "item active" : "item"}>用户管理
                        </div>
                    </div>
                    <div className="bottom-view">
                        <div>
                            <div className="title">v 0.0.1</div>
                        </div>
                    </div>
                </div>
                {this.renderMainView(activeCode)}
            </div>
        );
    }
}

ReactDOM.render(<ToolsApp theme="dark"/>, document.getElementById("app"));
