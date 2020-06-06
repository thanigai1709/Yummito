import React, { Component } from "react";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="t-ymt-nav-wrp">
        <div className="t-ymt-nav-flx-wrp">
          <div className="t-ymt-nav-col1">
            <span className="site-name">Yumitto</span>
          </div>
          <div className="t-ymt-nav-col2">
            <div className="t-ymt-nav-lnks">
              <span>Order Online</span>
              <span>About</span>
              <span>News</span>
              <span>Contact</span>
              <span>Blog</span>
            </div>
          </div>
          <div className="t-ymt-nav-col3">
            <div className="quick-cart">
              <span>
                <i className="fas fa-shopping-cart"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
