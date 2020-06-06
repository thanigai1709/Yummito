import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Global from "./Global";
import axios from "axios";
import Loader from "./Loader";
import SectionLoader from "./SectionLoader";
import RelatedItems from "./RelatedItems";
class ProductSingle extends Component {
  state = {
    ProductData: "",
    loading: true,
    RelatedWidget: ""
  };

  async componentDidMount() {
    axios
      .get(Global.BASE_URL + `/products/${this.props.match.params.id}`, {
        headers: {
          Authorization: Global.TOKEN
        }
      })
      .then(resp => {
        this.setState({
          ProductData: resp.data
        });
        this.RelatedItemsfetch(this.state.ProductData.categories[0].id);
      });
  }

  RelatedItemsfetch(req) {
    axios
      .get(Global.BASE_URL + `/products/?category=${req}`, {
        headers: {
          Authorization: Global.TOKEN
        }
      })
      .then(resp => {
        this.setState({
          RelatedWidget: resp.data,
          loading: false
        });
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <React.Fragment>
          <Header />
          <SectionLoader />
          <Footer />
        </React.Fragment>
      );
    } else {
      let rating = null;
      if (this.state.ProductData.average_rating > 4) {
        rating = "excellent";
      } else if (
        this.state.ProductData.average_rating < 4 &&
        this.state.ProductData.average_rating > 3.5
      ) {
        rating = "good";
      } else if (
        this.state.ProductData.average_rating < 3.5 &&
        this.state.ProductData.average_rating > 2.5
      ) {
        rating = "average";
      } else {
        rating = "poor";
      }
      return (
        <React.Fragment>
          <Header />
          <div className="product-wrp">
            <div className="container g-mt56 g-mb56">
              <div className="row">
                <div className="col-md-6">
                  <div className="product-img-wrp">
                    <img
                      src={this.state.ProductData.images[0].src}
                      alt="thumbnail"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product-descrp g-mb36">
                    <div className="product-descrp-name g-mb18">
                      {this.state.ProductData.name}
                    </div>
                    <div className="product-catergory">
                      <span className={"product-rating " + rating}>
                        {parseFloat(
                          this.state.ProductData.average_rating
                        ).toFixed(1)}
                      </span>
                      {this.state.ProductData.categories[0].name}
                    </div>
                    <div
                      className="product-descrp-exrecpt g-mb18"
                      dangerouslySetInnerHTML={{
                        __html: this.state.ProductData.short_description
                      }}
                    ></div>
                    <div className="price-availability-wrp g-mb8">
                      <span className="product-price-sgl">
                        ₹&nbsp;{this.state.ProductData.price}
                      </span>
                      <span className="product-availability">
                        {this.state.ProductData.stock_status}
                      </span>
                    </div>
                    <div className="product-add-to-cart-wrp">
                      <input type="number" name="" id="" defaultValue={1} />
                      <button className="g-button-red">
                        Buy Now&nbsp;<i className="fas fa-shopping-bag"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <span className="widget-name">Related Items</span>
              <hr />
            </div>
            <RelatedItems
              data={this.state.RelatedWidget}
              skip={this.state.ProductData.id}
            ></RelatedItems>
            <div className="product-footer-banner text-center ">
              <div className="product-footer-cnt g-pt56 g-pb56">
                Grand Italiano!
              </div>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      );
    }
  }
}

export default ProductSingle;
