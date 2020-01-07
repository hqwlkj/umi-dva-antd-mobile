import React from 'react';

export default class extends React.PureComponent<{}, {}, any> {
  public render() {
    console.log('this.props', this.props);
    return <>{this.renderContent()}</>;
  }

  private renderContent = () => {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <h1>TabBar Index Content</h1>
      </div>
    );
  };
}
