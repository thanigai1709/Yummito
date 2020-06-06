import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Product from "./Product";
import Loader from "./Loader";
import axios from "axios";
import { isArray } from "util";
import { Link } from "react-router-dom";
import Global from "./Global";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products_data: [],
      loading: false,
      query: "",
      categories: []
    };
    this.cancel = "";
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  async componentDidMount() {
    this.fetchResults(Global.BASE_URL + "/products?orderby=title&per_page=20");
  }

  fetchSearchResults = e => {
    e.preventDefault();
    this.state.categories.length
      ? this.fetchResults(
          Global.BASE_URL +
            `/products?search=${this.state.query}&category=${this.state.categories}`
        )
      : this.fetchResults(
          Global.BASE_URL +
            `/products?orderby=title&per_page=20&search=${this.state.query}`
        );
  };

  searchQuery = e => {
    this.setState({
      query: e.target.value
    });
  };

  handleCheckbox = e => {
    let categories = [...this.state.categories];
    !e.target.checked
      ? categories.splice(categories.indexOf(e.target.getAttribute("catid")), 1)
      : categories.push(e.target.getAttribute("catid"));
    this.setState(
      {
        categories: categories
      },
      () => {
        this.state.categories.length
          ? this.fetchResults(
              Global.BASE_URL +
                `/products?search=${this.state.query}&category=${this.state.categories}`
            )
          : this.fetchResults(Global.BASE_URL + "/products");
      }
    );
  };

  fetchResults(url) {
    this.setState({
      loading: true
    });
    if (this.cancel) {
      this.cancel.cancel();
      console.log("cancelled");
    }
    this.cancel = axios.CancelToken.source();
    console.log(this.cancel);
    axios
      .get(url, {
        headers: {
          Authorization: Global.TOKEN
        },
        cancelToken: this.cancel.token
      })
      .then(resp => {
        if (resp.data.length === 0) {
          console.log("no results found");
          this.setState({
            products_data: this.state.query,
            loading: false
          });
        } else {
          this.setState({
            products_data: resp.data,
            loading: false
          });
        }
      })
      .catch(err => {
        if (axios.isCancel(err) || err) {
          console.log(err);
        }
      });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="products-banner">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 text-center">
                <div className="banner-title">
                  Find the best Fish & Seafood in Chennai
                  <form onSubmit={this.fetchSearchResults}>
                    <div className="search-box-wrp g-mt36">
                      <div className="search-box">
                        <input type="text" onChange={this.searchQuery} />
                      </div>
                      <div className="search-button">
                        <button>
                          <i className="fas fa-search g-pr8"></i>Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
        <div className="container-fluid g-pt52 product-content">
          <div className="row">
            <div className="col-md-2">
              <div className="filter-wrp">
                <span className="title">Filter</span>
                <hr className="g-mb16" />
                <div className="categories-filter">
                  <span className="title">Category</span>
                  <label className="checkbox-cstm">
                    Entree
                    <input
                      type="checkbox"
                      name="entree"
                      catid="107"
                      onChange={this.handleCheckbox}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label className="checkbox-cstm">
                    Salads
                    <input
                      type="checkbox"
                      name="salads"
                      catid="108"
                      onChange={this.handleCheckbox}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label className="checkbox-cstm">
                    Starter
                    <input
                      type="checkbox"
                      name="starter"
                      catid="102"
                      onChange={this.handleCheckbox}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label className="checkbox-cstm">
                    Soups
                    <input
                      type="checkbox"
                      name="soups"
                      catid="106"
                      onChange={this.handleCheckbox}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label className="checkbox-cstm">
                    Desserts
                    <input
                      type="checkbox"
                      name="desserts"
                      catid="109"
                      onChange={this.handleCheckbox}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                {this.state.loading ? (
                  <Loader />
                ) : !isArray(this.state.products_data) ? (
                  <div className="no-results">
                    No results found for <span>{this.state.products_data}</span>{" "}
                    :(
                  </div>
                ) : (
                  this.state.products_data.map(product => (
                    <Product
                      id={product.id}
                      key={product.id}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      stock_status={product.stock_status}
                      average_rating={parseFloat(
                        product.average_rating
                      ).toFixed(1)}
                      image={product.images[0].src}
                      categories={product.categories[0].name}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Products;
