import React from 'react';
import { Icon, NavBar } from 'antd-mobile';
import { formatMessage } from 'umi-plugin-locale';
import styles from '@/pages/index.less';


export default function() {
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => history.back()}
      >{formatMessage({id: 'index.me'})}</NavBar>
      <h1 className={styles.title}>{formatMessage({id: 'index.me'})}</h1>
    </div>
  );
}
