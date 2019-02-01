// @ts-ignore
import TestPaper from '@/components/TestPaper';
import React from 'react';

const styles = require('./SixPage.less');

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
  public render(): React.ReactNode {
    const { data, swiper, onPrev } = this.props;
    return (
      <div className={styles['six-page-component']}>
        <img
          src={require('../../../assets/innerPage/six-drone.png')}
          alt="drone"
          className={styles.drone}
        />
        <TestPaper
          data={data}
          callback={() => {
            if (swiper && onPrev) {
              onPrev(swiper.realIndex - 1);
            }
          }}
        />
        <div className={styles['inner-wrapper']}>
          <img
            src={require('../../../assets/innerPage/six-operator.png')}
            alt="operator"
            className={styles.operator}
          />
          <img
            src={require('../../../assets/innerPage/six-audience.png')}
            alt="audience"
            className={styles.audience}
          />
          <img
            src={require('../../../assets/innerPage/gif/1.gif')}
            alt="audience"
            className={styles['audience-01']}
          />
        </div>
      </div>
    );
  }
}
