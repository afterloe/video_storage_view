"use strict";

class StorageApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <HeaderComponent acrive_code={2} showDocMenu={this.state.showDocMenu}/>
                <StorageView />
                <PageComponent position="pull-right" activeNum={1} docCount={1}/>
            </div>
        );

    }
}

ReactDOM.render(<StorageApp theme="dark"/>, document.getElementById("app"));
