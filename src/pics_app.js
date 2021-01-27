"use strict";

class PicStorageApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div>
                <HeaderComponent acrive_code={3} showDocMenu={this.state.showDocMenu}/>
                <PicViewComponent />
            </div>
        );
    }
}

ReactDOM.render(<PicStorageApp/>, document.getElementById("app"));