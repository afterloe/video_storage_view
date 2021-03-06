"use strict";

class CommentComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className="container rounded">
                <div className="text-muted pt-3 border-bottom border-gray rounded">
                    <div className="item">
                        <div className="bd-placeholder-img rounded"
                             style={{"background-color": bgColor[0]}}/>
                        <strong className="d-block text-gray-dark">这是评论</strong>
                    </div>
                    <div className="col-md-6 item">
                        <div className="small">
                            这是很好的一部电影
                        </div>
                    </div>
                    <div className="col-md-3 item">
                        <span className="click_link">2020-01-30 11:44:55</span>
                    </div>
                </div>
                <div className="text-muted pt-3 border-bottom border-gray rounded">
                    <div className="item">
                        <div className="bd-placeholder-img rounded"
                             style={{"background-color": bgColor[0]}}/>
                        <strong className="d-block text-gray-dark">这是昵称</strong>
                    </div>
                    <div className="col-md-6 item">
                        <div className="small">
                            这是很好的一部电影
                        </div>
                    </div>
                    <div className="col-md-3 item">
                        <span className="click_link">2020-01-30 11:44:55</span>
                    </div>
                </div>
            </div>
        );
    }
}