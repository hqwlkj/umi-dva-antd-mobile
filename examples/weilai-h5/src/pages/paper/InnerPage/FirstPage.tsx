import classnames from 'classnames';
import React from 'react';
import LS from 'parsec-ls';

const styles = require('./FirstPage.less');

interface IFirstPageState {
  toggle: [boolean, boolean];
}

interface IFirstPageProps {
  swiper: any;
  onPrev: (realIndex?: number) => void;
}

export default class extends React.Component<IFirstPageProps, IFirstPageState> {
  constructor(props) {
    super(props);
    this.state = {
      toggle: [false, false],
    };
  }

  render(): React.ReactNode {
    const { toggle } = this.state;
    return (
      <div className={styles['first-page-component']}>
        <img src={require('../../../assets/logo-01.png')} alt="logo" className={styles.logo}/>
        <div className={styles['dig-dipper-wrapper']}>
          <div className={styles.star} />
          <div className={styles.star} />
          <div className={styles.star} />
          <div className={styles.star} />
          <div className={styles.star} />
          <div className={styles.star} />
          <div className={styles.star} />
        </div>
        <div className={styles.innerContent}>
          <p>每个人在开车的时候都有</p>
          <p>不同的驾驶人格</p>
          <p>你的驾驶人格是什么？</p>
          <p>什么样的驾驶路线最合适你？</p>
          <p>请选择性别并开始测试</p>
          <div className={styles.radioButtons}>
            <div
              className={classnames(styles.radioBtn, { [styles.selected]: toggle[0] })}
              onClick={() => {
                this.handleSelectGender(1);
              }}
            >
              <div className={styles.icon}>
                <div className={styles.male} />
              </div>
              <span>男生</span>
            </div>
            <div
              className={classnames(styles.radioBtn, { [styles.selected]: toggle[1] })}
              onClick={() => {
                this.handleSelectGender(0);
              }}
            >
              <div className={styles.icon}>
                <div className={styles.female} />
              </div>
              <span>女生</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private handleSelectGender = (gender: number) => {
    const { swiper, onPrev } = this.props;
    this.setState(
      {
        toggle: [gender === 1, gender === 0],
      },
      () => {
        setTimeout(() => {
          LS.set('gender', gender);
          if (swiper && onPrev) {
            onPrev(swiper.realIndex - 1);
          }
        }, 500);
      }
    );
  };
}
