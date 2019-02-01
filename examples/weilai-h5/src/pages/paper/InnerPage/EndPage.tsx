import React from 'react';
import router from 'umi/router';

const styles = require('./EndPage.less');

interface IEndPageProps {
  swiper: any;
}

export default class extends React.Component<IEndPageProps, any> {
  public componentDidMount(): void {
    setTimeout(() => {
      router.push('/enter');
    }, 1500);
  }

  public render(): React.ReactNode {
    return (
      <div className={styles['end-page-component']}>
        <img
          src={require('../../../assets/innerPage/end-page-bg.png')}
          className={styles.rotateImg}
        />
      </div>
    );
  }
}
