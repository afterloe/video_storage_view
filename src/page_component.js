"use strict";

class PageComponent extends React.Component {
    constructor(props) {
        super(props);
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
        const {position = "", activeNum = 1, docCount = 1} = this.props;
        return (
            <div className="container">
                <ul className={"pagination " + position}>
                    {this.renderPage(activeNum, docCount)}
                </ul>
            </div>
        );
    }
}