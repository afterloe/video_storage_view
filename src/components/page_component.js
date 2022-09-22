"use strict";

class PageComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    clickPage = (num) => {
        this.props.clickPageCallback(num - 1);
    }

    renderPage = (activeNum, docCount, sumCount = 10) => {
        const html = [];
        html.push(activeNum === 0 ? (
            <li className="disabled">
                <span aria-label="Previous" data-reflect="1">
                    <span aria-hidden="true">&laquo;</span>
                </span>
            </li>
        ) : (
            <li>
                <span aria-label="Previous" data-reflect="1" onClick={this.clickPage}>
                    <span aria-hidden="true">&laquo;</span>
                </span>
            </li>
        ));
        const end = docCount % sumCount === 0 ? docCount / sumCount : Math.ceil(docCount / sumCount);
        const started = activeNum - sumCount / 2 < 0 ? 1 : activeNum - sumCount / 2;
        for (let i = started; i <= end; i++) {
            html.push(
                <li className={i === activeNum ? "active" : ""}>
                    <span className="rounded" onClick={() => this.clickPage(i)}>{i}</span>
                </li>
            );
        }
        html.push(activeNum + 1 === end ? (
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
        const { position = "", activeNum = 0, docCount = 1, total = 10 } = this.props;
        return (
            <div className="container">
                <ul className={"pagination " + position}>
                    {this.renderPage(activeNum, docCount, total)}
                </ul>
            </div>
        );
    }
}