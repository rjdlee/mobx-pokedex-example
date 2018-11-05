import * as React from "react";
import pokeballImage from '../pokeball.png';
import "./Loading.css";

export class Loading extends React.Component {
  public render() {
    return (
      <div className="loading">
        <h1>Searching...</h1>
        <img src={pokeballImage}/>
      </div>
    );
  }
}