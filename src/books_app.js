"use strict";

class BooksApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <HeaderComponent acrive_code={4} />
                <BooksViewComponent />
            </div>
        );

    }
}

ReactDOM.render(<BooksApp theme="dark"/>, document.getElementById("app"));
