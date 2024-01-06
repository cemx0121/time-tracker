import { Component } from "react";
import "./ErrorPage.css";

class Error extends Component {
  render() {
    return (
      <>
        <div className="center-top">
          <h1>{this.props.header}</h1>
          <p>{this.props.paragraph}</p>
        </div>
      </>
    );
  }
}

export default Error;
