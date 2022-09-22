"use strict";

class InputView extends React.Component {
    constructor(props) {
        super(props);
        this.closeWindow = this.closeWindow.bind(this);
        this.inputValue = this.inputValue.bind(this);
        this.submit = this.submit.bind(this);
    }

    closeWindow = e => {
        this.props.cannel();
        this.state = {}
    }

    submit = e => {
        this.props.then(this.state);
        this.state = {}
    }

    inputValue = e => {
        const key = e.target.getAttribute("data");
        const value = e.target.value;
        const index = e.target.getAttribute("index");
        const {argsGroup = []} = this.props;
        argsGroup[index]["val"] = value;
        this.setState({[key]: value});
    }

    renderLineHTML = ({i = 0, val, key, placeholder}, type = "input") => {
        switch (type) {
            case "input":
                return (<input index={i} placeholder={placeholder} value={val} data={key}
                               onChange={this.inputValue}
                               autoComplete="off"/>);
            case "multiline":
                return (<textarea rows="5" cols="30" index={i} placeholder={placeholder} value={val} data={key}
                                  onChange={this.inputValue}
                                  autoComplete="off"/>)
            default:
                return "";
        }
    }

    renderBodyHTML = (argsGroup = []) => {
        const that = this;
        return argsGroup.map(({
                                  label = "",
                                  key = "",
                                  val,
                                  viewOnly = false,
                                  placeholder = "请输入参数",
                                  type = "input"
                              }, i) => (
            <div className="input-view">
                <label>{label}</label>
                {viewOnly ? (<span className="view-only">{val}</span>) : (that.renderLineHTML({
                    i,
                    val,
                    key,
                    placeholder
                }, type))}
            </div>
        ));
    }

    render = () => {
        const {showWindow = false, title = "", argsGroup = [], msg = ""} = this.props;
        return (
            <div className={showWindow ? "modal mask show" : "modal mask"}>
                <div className="content">
                    <div className="mask-header">
                        <span className="title">{title}</span>
                    </div>
                    <div className="mask-body">
                        {0 === argsGroup.length ? (
                            <div className="no-value">{msg}</div>) : this.renderBodyHTML(argsGroup)}
                    </div>
                    <div className="mask-footer">
                        <div className="btn-group">
                            <span className="submit" onClick={this.submit}>确定</span>
                            <span className="cancel" onClick={this.closeWindow}>取消</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}