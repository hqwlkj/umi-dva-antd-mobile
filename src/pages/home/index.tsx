import { Button } from 'antd-mobile';
import React from 'react';
import router from 'umi/router';

const styles = require('./index.less');

export default class extends React.Component<{}> {
  constructor(props) {
    super(props);
  }

  public render = () => {
    return (
      <div className={styles.home}>
        <div className={styles.index}>
          <div className={styles.title}>网约车从业资格证</div>
          <div className={styles.subtitle}>考题练习及模拟考试</div>
          <Button
            type="primary"
            className={styles['btn-enter']}
            onClick={() => {
              // this.setState({ step: 1 });
              router.push('/entrance');
            }}
          >
            进入
          </Button>
        </div>
      </div>
    );
  };
}
