import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./components/Products";
import ProductSingle from "./components/ProductSingle";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/product/:id" component={ProductSingle} />
      </Switch>
    </Router>
  );
}

export default App;
