"use strict";

class IndexApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div>
                这是视频网站
            </div>
        );

    }
}

ReactDOM.render(<IndexApp theme="dark"/>, document.getElementById("app"));
