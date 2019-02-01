// @ts-ignore
import TestPaper from '@/components/TestPaper';
import React, { RefObject } from 'react';

const styles = require('./FivesPage.less');

interface IProps {
  swiper: any;
  onPrev: (realIndex?: number) => void;
  data: {
    title: { value: number; label: string };
    options: Array<{ value: number | string; label: string; score: number }>;
  };
}

interface IState {
  carDom?: RefObject<HTMLImageElement>;
}

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      carDom: React.createRef(),
    };
  }

  public render(): React.ReactNode {
    const { data, swiper, onPrev } = this.props;
    const { carDom } = this.state;
    return (
      <div className={styles['fives-page-component']}>
        <TestPaper
          data={data}
          callback={() => {
            if (swiper && onPrev) {
              onPrev(swiper.realIndex - 1);
            }
          }}
        />
        <div className={styles['taking-wrapper']}>
          <img
            src={require('../../../assets/innerPage/stool.png')}
            alt="stool"
            className={styles.stool}
          />
          <img
            ref={carDom}
            src={require('../../../assets/innerPage/fives-car.png')}
            alt="car"
            className={styles.car}
          />
          <img
            src={require('../../../assets/innerPage/gif/7.gif')}
            alt="taking"
            className={styles.taking}
          />
        </div>
      </div>
    );
  }
}
