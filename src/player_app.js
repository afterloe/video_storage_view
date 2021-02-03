"use strict";

class PlayerVideoApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const src = localStorage.getItem("src");
        const video = localStorage.getItem("video");
        this.setState({src, video: JSON.parse(video)});
    }

    render() {
        const {src, video} = this.state;
        return (
            <div>
                <HeaderComponent acrive_code={2} showDocMenu={this.state.showDocMenu}/>
                <PlayerVideoComponent videoSrc={src} video={video}/>
                <CommentComponent/>
            </div>
        );

    }
}

ReactDOM.render(<PlayerVideoApp theme="dark"/>, document.getElementById("app"));
