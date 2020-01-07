import React from 'react';

export default class extends React.PureComponent {
  public render() {
    return <>{this.renderContent()}</>;
  }

  private renderContent = () => {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <h1>TabBar Koubei Content</h1>
      </div>
    );
  };
}
