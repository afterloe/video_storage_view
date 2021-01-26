"use strict";

class PlayerVideoApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <HeaderComponent acrive_code={2} showDocMenu={this.state.showDocMenu}/>
                <PlayerVideoComponent />
            </div>
        );

    }
}

ReactDOM.render(<PlayerVideoApp theme="dark"/>, document.getElementById("app"));
