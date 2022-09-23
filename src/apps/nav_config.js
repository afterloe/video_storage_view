"use strict";

/**
 * 导航配置
 */
 class NavConfigApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
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
            if (value) {
                that.setState({nav: value});
            }
        }).catch(({code}) => {
            if (401 === code) {
                that.setState(() => ({
                    token: null,
                    who: null,
                }));
                that.setState({nav: []});
                alert("请登录");
                window.location.href = "/video-storage/login.html";
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
                            <div className="col-md-2" style={{"padding-left": "5rem;"}}>{i + 1} - {j + 1}</div>
                            <div className="col-md-2">{name}</div>
                            <div className="col-md-5">{data}</div>
                            <div className="col-md-3 options">
                                <span onClick={() => this.openModifyDictionaryItemWindow(v)}>修改</span>
                                <span onClick={() => this.openDeleteDictionaryItemWindow(v)}>删除</span>
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
        showAppendDictionaryWindow: false,
        showModifyDictionaryItemWindow: false,
        showDeleteDictionaryItemWindow: false,
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
            msg: `确定删除“${nav[index].name}”?`,
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
            argsGroup: [{label: "标签名", key: "name"}, {label: "标签值", key: "data"}],
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

    openModifyDictionaryItemWindow = v => {
        this.setState({
            showModifyDictionaryItemWindow: true,
            argsGroup: [{label: "标签名", key: "name", val: v.name}, {label: "标签值", key: "data", val: v.data}],
            target: v,
        })
    }

    modifyDictionaryItem = value => {
        if (null == value) {
            return
        }
        const {target = {}} = this.state;
        Object.assign(target, value);
        let that = this;
        Req({
            method: "POST",
            url: "/backend/aip/dictionary",
            data: target
        }).then(() => {
            that.loadData();
        }).catch(({msg}) => {
            that.setState({err: msg});
        });
        that.setState({showModifyDictionaryItemWindow: false});
    }

    deleteDictionaryItem = () => {
        let that = this;
        const {target = {}} = this.state;
        Req({
            method: "DELETE",
            url: "/backend/aip/dictionary?id=" + target.id,
        }).then(data => {
            that.loadData();
        }).catch(({msg}) => {
            that.setState({err: msg});
        });
        that.setState({showDeleteDictionaryItemWindow: false});
    }

    openDeleteDictionaryItemWindow = v => {
        this.setState({
            showDeleteDictionaryItemWindow: true,
            msg: `确定删除子标签“${v.name}”?`,
            target: v,
        });
    }

    render = () => {
        const {
            nav = [],
            showCreateDictionaryGroupWindow = false,
            showModifyDictionaryGroupWindow = false,
            showDeleteDictionaryGroupWindow = false,
            showAppendDictionaryWindow = false,
            showModifyDictionaryItemWindow = false,
            showDeleteDictionaryItemWindow = false,
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
                <InputView showWindow={showAppendDictionaryWindow} title="追加子标签" argsGroup={argsGroup}
                           then={this.appendDictionary} cannel={this.closeWindow}/>
                <InputView showWindow={showModifyDictionaryItemWindow} title="修改子标签" argsGroup={argsGroup}
                           then={this.modifyDictionaryItem} cannel={this.closeWindow}/>
                <InputView showWindow={showDeleteDictionaryItemWindow} title="删除子标签" msg={msg}
                           then={this.deleteDictionaryItem} cannel={this.closeWindow}/>
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