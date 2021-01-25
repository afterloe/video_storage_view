"use strict";

class IndexApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="homePageApp">
                <HeaderComponent showDocMenu={this.state.showDocMenu}/>
                <HomeView />
                <FooterComponent />
            </div>
        );

    }
}

ReactDOM.render(<IndexApp theme="dark"/>, document.getElementById("app"));
