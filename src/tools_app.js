"use strict";

class ToolsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="tools_app">
                <div className="left_control">
                    <div>
                        <div className="title">直播</div>
                        <div className="item">直播管理</div>
                    </div>
                    <div className="line"/>
                    <div>
                        <div className="title">内容</div>
                        <div className="item active">视频管理</div>
                        <div className="item">图片管理</div>
                        <div className="item">小说管理</div>
                    </div>
                    <div className="line"/>
                    <div>
                        <div className="title">用户</div>
                        <div className="item">用户管理</div>
                    </div>
                </div>
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
                    <div className="main">
                        <div className="title">
                            <div>序号</div>
                            <div>名称</div>
                            <div>类型</div>
                            <div>大小</div>
                            <div>时长</div>
                            <div>操作</div>
                        </div>
                        <div className="values">
                            <div className="">
                                <div>1</div>
                                <div>1</div>
                                <div>1</div>
                                <div>1</div>
                                <div>1</div>
                                <div>
                                    <span>删除</span>
                                    <span>修改</span>
                                    <span>下架</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

ReactDOM.render(<ToolsApp theme="dark"/>, document.getElementById("app"));
