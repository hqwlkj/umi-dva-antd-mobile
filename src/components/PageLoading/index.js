import React from 'react';
import { ActivityIndicator } from 'antd-mobile';

export default () => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100px',
      height: '100px',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <ActivityIndicator animating size="large" />
      <span style={{ marginTop: 8 }}>加载中...</span>
    </div>
  </div>
);
