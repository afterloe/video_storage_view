"use strict";

class StorageApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="homePageApp">
                <HeaderComponent acrive_code={2} showDocMenu={this.state.showDocMenu}/>
            </div>
        );

    }
}

ReactDOM.render(<StorageApp theme="dark"/>, document.getElementById("app"));
