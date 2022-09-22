"use strict";

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
            case 9:
                return <FileMeatdataManagerApp/>
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
                        <div onClick={e => this.changeView(9)}
                             className={activeCode === 9 ? "item active" : "item"}>元数据管理
                        </div>
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
