import React, { Component } from "react";
import { Link } from "react-router-dom";
class Product extends Component {
  state = {};

  render() {
    const rating = [];
    if (this.props.average_rating > 4) {
      rating.push("excellent");
    } else if (
      this.props.average_rating < 4 &&
      this.props.average_rating > 3.5
    ) {
      rating.push("good");
    } else if (
      this.props.average_rating < 3.5 &&
      this.props.average_rating > 2.5
    ) {
      rating.push("average");
    } else {
      rating.push("poor");
    }

    return (
      <div className="col-md-4">
        <div className="product-item-wrp">
          <div className="product-image">
            <Link to={`/product/${this.props.id}`}>
              <img src={this.props.image} alt="thumbnail" />
            </Link>
          </div>
          <div className="product-item-cnt g-p16">
            <div className="product-name">
              {this.props.name}
              <span className={"product-rating " + rating}>
                {this.props.average_rating}
              </span>
            </div>
            <div className="product-catergory">{this.props.categories}</div>
            <hr />
            <div className="product-buy g-mt12">
              <div className="product-price g-mt8">
                <span>‎₹ {this.props.price}</span>
              </div>
              <div className="product-buy-now">
                <button className="g-button-red">
                  <i className="fas fa-cart-plus"></i>Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
