import React from 'react';

export default class extends React.PureComponent<{}, {}, any> {
  public render() {
    return <>{this.renderContent()}</>;
  }

  private renderContent = () => {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <h1>TabBar Friend Content</h1>
      </div>
    );
  };
}
