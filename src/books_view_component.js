"use strict";

class BooksViewComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bg: bgColor[Math.round(Math.random() * 8)]
        };
    }

    render = () => {
        const {bg} = this.state;

        return (
            <main className="container" style={{"padding-top": "8rem"}}>
                <div className="view_bar"
                     style={{"background-color": bg}}>
                    <span className="title">书本分类</span>
                    <span className="func-group">
                        <span className="active">玄幻</span>
                        <span>修真</span>
                        <span>武侠</span>
                        <span>言情</span>
                        <span>历史</span>
                    </span>
                </div>
                <div className="rounded">
                    <div className="text-muted border-gray rounded">
                        <div className="col-md-2 item b">
                            序号
                        </div>
                        <div className="col-md-4 item b">
                            书名
                        </div>
                        <div className="col-md-2 item b">
                            作者
                        </div>
                        <div className="col-md-2 item b">
                            上传时间
                        </div>
                        <div className="col-md-2 item b">
                            大小
                        </div>
                        <div className="col-md-2 item b">
                            热度
                        </div>
                    </div>
                    <div className="bookshelf">
                        <div className="text-muted border-gray rounded">
                            <div className="col-md-2 item">
                                1
                            </div>
                            <div className="col-md-4 item">
                                送你一朵小红花（剧本）
                            </div>
                            <div className="col-md-2 item">
                                佚名
                            </div>
                            <div className="col-md-2 item">
                                2021-01-22 15:22:51
                            </div>
                            <div className="col-md-2 item">
                                33.6KB
                            </div>
                            <div className="col-md-2 item">
                                112605
                            </div>
                        </div>
                        <div className="text-muted border-gray rounded">
                            <div className="col-md-2 item">
                                1
                            </div>
                            <div className="col-md-4 item">
                                送你一朵小红花（剧本）
                            </div>
                            <div className="col-md-2 item">
                                佚名
                            </div>
                            <div className="col-md-2 item">
                                2021-01-22 15:22:51
                            </div>
                            <div className="col-md-2 item">
                                33.6KB
                            </div>
                            <div className="col-md-2 item">
                                112605
                            </div>
                        </div>
                        <div className="text-muted border-gray rounded">
                            <div className="col-md-2 item">
                                1
                            </div>
                            <div className="col-md-4 item">
                                送你一朵小红花（剧本）
                            </div>
                            <div className="col-md-2 item">
                                佚名
                            </div>
                            <div className="col-md-2 item">
                                2021-01-22 15:22:51
                            </div>
                            <div className="col-md-2 item">
                                33.6KB
                            </div>
                            <div className="col-md-2 item">
                                112605
                            </div>
                        </div>
                        <div className="text-muted border-gray rounded">
                            <div className="col-md-2 item">
                                1
                            </div>
                            <div className="col-md-4 item">
                                送你一朵小红花（剧本）
                            </div>
                            <div className="col-md-2 item">
                                佚名
                            </div>
                            <div className="col-md-2 item">
                                2021-01-22 15:22:51
                            </div>
                            <div className="col-md-2 item">
                                33.6KB
                            </div>
                            <div className="col-md-2 item">
                                112605
                            </div>
                        </div>
                        <div className="text-muted border-gray rounded">
                            <div className="col-md-2 item">
                                1
                            </div>
                            <div className="col-md-4 item">
                                送你一朵小红花（剧本）
                            </div>
                            <div className="col-md-2 item">
                                佚名
                            </div>
                            <div className="col-md-2 item">
                                2021-01-22 15:22:51
                            </div>
                            <div className="col-md-2 item">
                                33.6KB
                            </div>
                            <div className="col-md-2 item">
                                112605
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}