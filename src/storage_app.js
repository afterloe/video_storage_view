"use strict";

class StorageApp extends React.Component {

    constructor(props) {
        super(props);
        this.clickPageItem = this.clickPageItem.bind(this);
        this.state = {
            bg: bgColor[Math.round(Math.random() * 8)],
            target: getTarget("type") || "hot",
        };
    }

    componentDidMount() {
        this.loadVideoList();
    }

    loadVideoList() {
        const that = this;
        const {target = "hot", page = 0, count = 25} = that.state;
        Req({
            method: "GET",
            url: `/backend/aip/video/list?type=${target}&page=${page}&count=${count}`,
        }).then(value => {
            that.setState(value);
        }).catch(({code, message}) => {
            checkErrorCode(code);
        });
    }

    clickPageItem(activeNum = 0) {
        this.setState({
            page: activeNum
        });
        this.loadVideoList();
    }

    render() {
        const {data = [], page = 0, total = 0, bg} = this.state
        return (
            <div>
                <HeaderComponent acrive_code={2} showDocMenu={this.state.showDocMenu}/>
                <StorageView videoList={data} background={bg}/>
                <PageComponent position="pull-right" activeNum={page} docCount={data ? data.length : 0} total={total}
                               clickPageCallback={this.clickPageItem}/>
            </div>
        );
    }
}

ReactDOM.render(<StorageApp theme="dark"/>, document.getElementById("app"));
