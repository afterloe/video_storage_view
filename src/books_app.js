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
                <PageComponent position="pull-right" activeNum={1} docCount={1}/>
            </div>
        );

    }
}

ReactDOM.render(<BooksApp theme="dark"/>, document.getElementById("app"));
