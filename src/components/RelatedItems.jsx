import React, { Component } from "react";
import Owl from "react-owl-carousel";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Global from "./Global";

class RelatedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.relatedItems = [];
  }
  render() {
    return (
      <div className="relative-widget">
        <Owl
          items={this.props.data.length}
          className="owl-theme"
          loop
          margin={36}
          padding={8}
        >
          {this.props.data.filter(item => {
            if (this.props.skip !== item.id) {
              this.relatedItems.push(item);
            }
          })}

          {this.relatedItems.map(item => (
            <div key={item.id} className="related-item-wrp">
              <div className="related-item-img">
                <Link to={`/product/${item.id}`} target="_blank">
                  <img src={item.images[0].src} alt="image" />
                </Link>
              </div>
              <div className="related-item-cnt">
                <div className="related-item-Name">{item.name}</div>
                <div className="product-price g-mt8">
                  <span>‎₹ {item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </Owl>
      </div>
    );
  }
}

export default RelatedItems;
