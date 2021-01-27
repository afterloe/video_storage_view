"use strict";

class PicViewComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bg: bgColor[Math.round(Math.random() * 8)]
        };
        this.enlargePic = this.enlargePic.bind(this);
    }

    enlargePic = e => {
        const url = e.target.getAttribute("src");
        console.log(url);

    }

    render = () => {
        const {bg} = this.state;

        return (
            <main className="container" style={{"padding-top": "8rem"}}>

                <div className="detail_view">
                    <div className="modal mask">
                        <div className="view">
                            <picture>
                                <img src="/video-storage/images/img_1.png" alt="图片"/>
                            </picture>
                        </div>
                    </div>
                </div>

                <div className="view_bar"
                     style={{"background-color": bg}}>
                    <span className="title">文件夹目录</span>
                    <span className="func-group">
                        <select placeholder="选择图片类型" className={"search-view"}>
                            <option>影视截图</option>
                            <option>精彩瞬间</option>
                            <option>纪念时刻</option>
                            <option>历史长河</option>
                        </select>
                    </span>
                </div>
                <div className="row pic-list">
                    <div className="pic-group">
                        <picture>
                            <img src="/video-storage/images/img_1.png" alt="图片" onClick={this.enlargePic}/>
                        </picture>
                        <picture>
                            <img src="/video-storage/images/img_1.png" alt="图片"/>
                        </picture>
                        <picture>
                            <img src="/video-storage/images/img_1.png" alt="图片"/>
                        </picture>
                    </div>
                    <div className="pic-group">
                        <picture>
                            <img src="/video-storage/images/img_1.png" alt="图片"/>
                        </picture>
                        <picture>
                            <img src="/video-storage/images/banner2-2.png" alt="图片"/>
                        </picture>
                    </div>
                    <span className="line"/>
                </div>
            </main>
        );
    }
}