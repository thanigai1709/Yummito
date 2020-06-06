import React, { Component } from "react";
class Loader extends Component {
  state = {};
  render() {
    return (
      <div className="t-loader-wrp">
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>        
      </div>
    );
  }
}

export default Loader;
