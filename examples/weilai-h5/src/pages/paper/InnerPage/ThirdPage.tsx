// @ts-ignore
import TestPaper from '@/components/TestPaper';
import React from 'react';

const styles = require('./ThirdPage.less');

interface IProps {
  swiper: any;
  onPrev: (realIndex?: number) => void;
  data: {
    title: { value: number; label: string };
    options: Array<{ value: number | string; label: string; score: number }>;
  };
}

interface IState {
  toggle: number;
}

export default class extends React.Component<IProps, IState> {
  render(): React.ReactNode {
    const { data, swiper, onPrev } = this.props;
    return (
      <div className={styles['third-page-component']}>
        <TestPaper
          data={data}
          callback={() => {
            if (swiper && onPrev) {
              onPrev(swiper.realIndex - 1);
            }
          }}
        />
        <div className={styles['exhibition-center-wrapper']}>
          <img
            src={require('../../../assets/innerPage/4sshop/02.png')}
            alt="floor"
            className={styles.counter}
          />
          <img
            src={require('../../../assets/innerPage/4sshop/03.png')}
            alt="floor"
            className={styles.tree}
          />
          <img
            src={require('../../../assets/innerPage/4sshop/04.png')}
            alt="floor"
            className={styles.logo}
          />
          <img
            src={require('../../../assets/innerPage/4sshop/05.png')}
            alt="floor"
            className={styles.showcase}
          />
          <img
            src={require('../../../assets/innerPage/4sshop/06.png')}
            alt="floor"
            className={styles.sidebar}
          />
          <img
            src={require('../../../assets/innerPage/4sshop/07.png')}
            alt="floor"
            className={styles['showcase-01']}
          />
          <img
            src={require('../../../assets/innerPage/gif/km.gif')}
            alt="floor"
            className={styles['door-01']}
          />
          <img
            src={require('../../../assets/innerPage/gif/6.gif')}
            alt="floor"
            className={styles['door-person']}
          />
          <img
            src={require('../../../assets/innerPage/4sshop/08.png')}
            alt="floor"
            className={styles.door}
          />
          <img
            src={require('../../../assets/innerPage/4sshop/09.png')}
            alt="floor"
            className={styles.guests}
          />
        </div>
      </div>
    );
  }
}
