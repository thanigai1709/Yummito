import React, { Component } from "react";
class SectionLoader extends Component {
  state = {};
  render() {
    return (
      <div className="t-section-loader-wrp">
        <div className="t-section-loader-inr-wrp">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default SectionLoader;
