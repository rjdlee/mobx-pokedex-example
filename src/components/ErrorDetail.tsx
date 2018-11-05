import * as React from "react";
import "./ErrorDetail.css";

interface IProps {
  error?: any;
}

export class ErrorDetail extends React.Component<IProps, {}> {
  public readonly props: IProps;

  public render() {
    return (
      <div className="error">
        <div>
          <h1>Something went wrong!</h1>
          {JSON.stringify(this.props.error)}
        </div>
        <div>
          <img src="https://rjdlee.com/projects/dubemon/img/Charmander.jpg" alt="Pokemon Image"/>
        </div>
      </div>
    );
  }
}