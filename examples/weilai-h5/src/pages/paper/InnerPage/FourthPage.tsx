// @ts-ignore
import TestPaper from '@/components/TestPaper';
import React from 'react';

const styles = require('./FourthPage.less');

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
      <div className={styles['fourth-page-component']}>
        <TestPaper
          data={data}
          callback={() => {
            if (swiper && onPrev) {
              onPrev(swiper.realIndex - 1);
            }
          }}
        />
        <div className={styles['car-wrapper']}>
          <img
            src={require('../../../assets/innerPage/gif/4.gif')}
            alt="nomi"
            className={styles.nomi}
          />
        </div>
      </div>
    );
  }
}
