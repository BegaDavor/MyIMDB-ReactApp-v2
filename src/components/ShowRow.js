import React, { Component } from "react";
import "../style/style.css";
import View from "./view";

class ShowRow extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <table className="table" key={this.props.show.id}>
          <tbody>
            <td className="w-10">
              <img
                src={this.props.show.poster_src}
                alt="poster"
                style={{
                  width: 80,
                  height: 120
                }}
              />
            </td>
            <td className="w-75">
              <h4>
                {this.props.show.name}{" "}
                <span
                  style={{
                    fontSize: 10,
                    fontStyle: "bold",
                    paddingLeft: 5
                  }}
                >
                  <a href="/view">View</a>
                  <View {...this.props} />
                </span>
              </h4>
              <span>
                <b>Release Date: </b>
                {this.props.show.first_air_date}
              </span>
              {"\n "}
              <p>{this.props.show.overview}</p>
            </td>
            <td className="w-5">
              <h4>
                <span className="badge badge-pill badge-warning">
                  {this.props.show.vote_average.toFixed(2)}
                </span>
              </h4>
            </td>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default ShowRow;
