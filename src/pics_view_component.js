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

    renderPage = (activeNum, docCount) => {
        const html = [];
        html.push(activeNum !== 1 ? (
            <li>
                <span aria-label="Previous" data-reflect="1" onClick={this.clickPage}>
                    <span aria-hidden="true">&laquo;</span>
                </span>
            </li>
        ) : (
            <li className="disabled">
                <span aria-label="Previous" data-reflect="1">
                    <span aria-hidden="true">&laquo;</span>
                </span>
            </li>
        ));
        const end = docCount % 10 === 0 ? docCount / 10 : Math.ceil(docCount / 10);
        const started = activeNum - 5 < 0 ? 1 : activeNum - 5;
        for (let i = started; i <= end; i++) {
            html.push(
                <li className={i === activeNum ? "active" : ""}>
                    <span className="rounded" data-reflect={i} onClick={this.clickPage}>{i}</span>
                </li>
            );
        }
        html.push(activeNum === end ? (<li className="disabled">
            <span aria-label="Next" data-reflect={html.length - 1}>
                <span aria-hidden="true">&raquo;</span>
            </span>
        </li>) : (<li>
            <span aria-label="Next" data-reflect={html.length - 1} onClick={this.clickPage}>
                <span aria-hidden="true">&raquo;</span>
            </span>
        </li>));
        return html;
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
                <div className="row">
                    <ul className="pagination pull-right" style={{}}>
                        {this.renderPage(1, 1)}
                    </ul>
                </div>
                <div className="row pic-list">
                    <span className="line"/>
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
                <div className="row">
                    <ul className="pagination pull-right" style={{}}>
                        {this.renderPage(1, 1)}
                    </ul>
                </div>
            </main>
        );
    }
}