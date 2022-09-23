"use strict";

class PageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    clickPage(num) {
        this.props.clickPageCallback(num);
    }

    renderPage(activeNum, docCount, total = 10) {
        const html = [];
        if (total == 0) {
            return html;
        }
        html.push(activeNum === 1 ? (
            <li className="disabled">
                <span aria-label="Previous" data-reflect="1">
                    <span aria-hidden="true">&laquo;</span>
                </span>
            </li>
        ) : (
            <li>
                <span aria-label="Previous" data-reflect="1" onClick={() => this.clickPage(1)}>
                    <span aria-hidden="true">&laquo;</span>
                </span>
            </li>
        ));

        let end = Math.ceil(total / docCount) + 1
        let pageEnd = end;
        let started = 1;
        
        if (end - activeNum > 5) {
            started = activeNum - 5 >= 1 ? activeNum - 5: 1;
            end = activeNum + 6;
        } else {
            started = activeNum - 6;
        }
        if (activeNum <= 5) {
            end = 10;
        }

        for (let i = started; i < end; i++) {
            html.push(
                <li className={i === activeNum ? "active" : ""}>
                    <span className="rounded" onClick={() => this.clickPage(i)}>{i}</span>
                </li>
            );
        }
        html.push(activeNum === end - 1 ? (
            <li className="disabled">
                <span aria-label="Next" data-reflect={html.length - 1}>
                    <span aria-hidden="true">&raquo;</span>
                </span>
            </li>) : (
            <li>
                <span aria-label="Next" data-reflect={html.length - 1} onClick={() => this.clickPage(pageEnd - 1)}>
                    <span aria-hidden="true">&raquo;</span>
                </span>
            </li>
        ));

        return html
    }

    render() {
        const { position = "", activeNum, docCount, total } = this.props;
        return (
            <div className="container">
                <ul className={"pagination " + position}>
                    {this.renderPage(activeNum, docCount, total)}
                </ul>
            </div>
        );
    }
}