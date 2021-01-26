"use strict";

const bgColor = ["#009eff", "#2c88d8", "#427ed0", "#6967c1", "#9a61ba", "#b268b8", "#d974ba", "#e672b4", "#f58dbf", "#f2f2f2"];

class StorageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bg: bgColor[Math.round(Math.random() * 8)],
            target: getTarget("type") || "hot",
        };
    }

    generatorTitle = target => {
        if (target === "hot") {
            return (
                <div className="lh-100">
                    <h4 className="storage-title">热度推荐</h4>
                    <div style={{ height: "3rem", "line-height": "3rem"}}>
                        <div className={"pull-left item-list"}>
                            <small>点播热度</small>
                            <small>评论数</small>
                            <small>点赞数</small>
                        </div>
                        <div className={"pull-right search-group"}>
                            <input placeholder="搜索你的最爱" autoComplete="off" className={"search-view"}/>
                            <span className={"search-btn"}>搜索</span>
                        </div>
                    </div>
                </div>
            );
        } else if (target === "movie") {
            return (
                <div className="lh-100">
                    <h4 className="mb-0 text-white lh-100">电影</h4>
                    <small> </small>
                </div>
            )
        } else if (target === "tv") {
            return (
                <div className="lh-100">
                    <h4 className="mb-0 text-white lh-100">电视剧</h4>
                    <small> </small>
                </div>
            )
        } else if (target === "comic") {
            return (
                <div className="lh-100">
                    <h4 className="mb-0 text-white lh-100">动漫</h4>
                    <small> </small>
                </div>
            )
        }
    }

    render = () => {
        const {bg, target} = this.state;
        return (
            <main className="container" style={{"padding-top": "7rem"}}>
                <div className="d-flex align-items-center p-3 my-3 text-white-50 rounded shadow-sm"
                     style={{"background-color": bg}}>
                    {this.generatorTitle(target)}
                </div>
            </main>
        );

    }
}