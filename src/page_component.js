"use strict";

class PageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    renderPage = (activeNum, docCount, sumCount = 10) => {
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
        const end = docCount % sumCount === 0 ? docCount / sumCount : Math.ceil(docCount / sumCount);
        const started = activeNum - sumCount / 2 < 0 ? 1 : activeNum - sumCount / 2;
        for (let i = started; i <= end; i++) {
            html.push(
                <li className={i === activeNum ? "active" : ""}>
                    <span className="rounded" data-reflect={i} onClick={this.clickPage}>{i}</span>
                </li>
            );
        }
        html.push(activeNum === end ? (
            <li className="disabled">
            <span aria-label="Next" data-reflect={html.length - 1}>
                <span aria-hidden="true">&raquo;</span>
            </span>
            </li>) : (
            <li>
            <span aria-label="Next" data-reflect={html.length - 1} onClick={this.clickPage}>
                <span aria-hidden="true">&raquo;</span>
            </span>
            </li>
        ));

        return html;
    }

    render = () => {
        const {position = "", activeNum = 1, docCount = 1, sumCount = 10} = this.props;
        return (
            <div className="container">
                <ul className={"pagination " + position}>
                    {this.renderPage(activeNum, docCount, sumCount)}
                </ul>
            </div>
        );
    }
}