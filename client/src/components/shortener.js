import React, { Component } from "react";
import axios from "axios";
import validator from "validator";
import "./shortener.css";

export default class Shortener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      link: "",
      valid: false,
    };

    this.validUrl = this.validUrl.bind(this);
    this.copyFunction = this.copyFunction.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      url: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const validURL = validator.isURL(this.state.url, {
      require_protocol: false,
    });
    if (!validURL) {
      this.setState({
        valid: false,
      });
    } else {
      this.setState({
        valid: true,
      });
      console.log("URL is :", this.state.url);
      axios
        .post("http://localhost:5000/api/shorten", {
          url: this.state.url,
        })
        .then((res) => {
          console.log(res.data.hash);
          this.setState({
            link: `http://localhost:5000/${res.data.hash}`,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  copyFunction = () => {
    navigator.clipboard.writeText(this.state.link);
  };

  validUrl = () => {
    let { valid, link, url } = this.state;
    if (url.length > 0 && valid === true) {
      return (
        <div>
          <span>{link}</span>

          <button
            className="btn btn-outline-success"
            style={{ marginLeft: "0.5rem" }}
            onClick={this.copyFunction}
          >
            Copy Link
          </button>
        </div>
      );
    } else if (url.length > 0 && valid === false) {
      return "Please enter a valid url";
    } else {
      return "Please enter a url";
    }
  };

  render() {
    return (
      <div className="main">
        <div className="head">
          <h1 className="main-heading" style={{ marginLeft: "1rem" }}>
            <span className="highlight text-light">URL Shortener</span>
          </h1>
          <small className="text-success " style={{ marginLeft: "1rem" }}>
            Shorten your url easily
          </small>
        </div>
        <div className="shortner">
          <form onSubmit={this.handleSubmit} className="form-inline">
            <input
              type="text"
              name="url"
              placeholder="Enter url"
              onChange={this.handleChange}
              className="form-control"
            />
            <input
              type="submit"
              value="Shorten"
              className="btn btn-outline-success"
              style={{ marginLeft: "0.2rem" }}
            />
          </form>
          <fieldset className="new_url mt-3">
            <span id="result" className="text-white">
              {this.validUrl()}
            </span>
          </fieldset>
        </div>
      </div>
    );
  }
}
