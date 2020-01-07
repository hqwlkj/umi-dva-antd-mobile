import React from 'react';
import { ITabBarItemProps } from './tabBarItemProps';

const styles = require('./index.less');

export interface ITabBarMeunProps {
  bars: ITabBarItemProps[];
}

export default class extends React.PureComponent<ITabBarMeunProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return <div className={styles.tabBarMenu}>2</div>;
  }
}
