import React, { PureComponent } from 'react';

class Exception extends PureComponent {
  render() {
    const { children } = this.props;

    return <div>{children}</div>;
  }
}

export default Exception;
