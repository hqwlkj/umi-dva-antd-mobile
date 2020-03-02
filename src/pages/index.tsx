import React from 'react';
import { formatMessage } from 'umi-plugin-locale';
import {Button, NavBar, Icon} from 'antd-mobile';
import { Link } from 'umi';
import styles from './index.less';

export default function() {
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >{formatMessage({ id: 'index.home' })}</NavBar>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            {formatMessage({ id: 'index.start' })}
          </a>
        </li>
        <li><Link to="/me">{formatMessage({ id: 'index.me' })}</Link></li>
      </ul>
      <Button type='warning'>test</Button>
    </div>
  );
}
