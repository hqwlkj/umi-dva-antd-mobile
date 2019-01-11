import React from "react";


export default class index extends React.Component<{ message: string; }> {
  render() {
    return (<div>
      <h1>Umi Dva Antd Mobile</h1>
      <p>{this.props.message}</p>
    </div>);
  }

}