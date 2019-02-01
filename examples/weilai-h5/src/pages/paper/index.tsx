import classnames from 'classnames';
import React from 'react';
import Swiper from 'swiper';
import router from 'umi/router';
// import EndPage from './InnerPage/EndPage';
import FirstPage from './InnerPage/FirstPage';
import FivesPage from './InnerPage/FivesPage';
import FourthPage from './InnerPage/FourthPage';
import SecondPage from './InnerPage/SecondPage';
import SixPage from './InnerPage/SixPage';
import ThirdPage from './InnerPage/ThirdPage';

const styles = require('./index.less');

interface IState {
  mySwiper: any;
  pageIndex: number;
  questions: Array<{
    title: { value: number; label: string };
    options: Array<{ value: number | string; label: string; score: number }>;
  }>;
}

export default class extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 5,
      mySwiper: {},
      questions: [
        {
          title: { value: 1, label: '要换新手机，iPhone XS 和华为Mate 20 Pro，选哪一个好' },
          options: [
            { value: 'A', label: '忠实果粉，迫不及待要用上走在创新前沿的新手机', score: 5 },
            { value: 'B', label: '黑科技可不只是苹果，做个“花”粉才是最新潮流', score: 3 },
            { value: 'C', label: '换个电池、贴个膜，这个手机还能撑上三五年，不换', score: 0 },
          ],
        },
        {
          title: { value: 2, label: '如果你是NIO House的主人，你想把TA造在哪儿？' },
          options: [
            { value: 'A', label: '静谧的贝加尔湖畔', score: 0 },
            { value: 'B', label: '狂野的肯尼亚大草原', score: 5 },
            { value: 'C', label: '热闹的纽约时代广场', score: 3 },
          ],
        },
        {
          title: { value: 3, label: 'Hi NOMI，请播放一首______ ？' },
          options: [
            { value: 'A', label: '经典老歌，永远热泪盈眶', score: 0 },
            { value: 'B', label: '流行歌曲，火遍大街小巷', score: 3 },
            { value: 'C', label: '摇滚乐，嗜爱热血青年', score: 5 },
          ],
        },
        {
          title: { value: 4, label: '下一期Travel with NIO要来啦，你想和大家去哪儿？' },
          options: [
            { value: 'A', label: '深度人文，品地域风情', score: 3 },
            { value: 'B', label: '新鲜猎奇，解锁新大陆', score: 5 },
            { value: 'C', label: ' 诗意山水，承包大自然', score: 0 },
          ],
        },
        {
          title: {
            value: 5,
            label: '你成为了下一季蔚来生活家的主人翁，你希望和大家分享怎样的自己？',
          },
          options: [
            { value: 'A', label: '极限运动大玩咖，既能上天跳伞，又能入海深潜', score: 5 },
            { value: 'B', label: '安静美女子/美男子，生活艺术家，享受有品质的慢生活', score: 0 },
            { value: 'C', label: 'AI机器人、大疆无人机、火箭科学家，黑科技我最在行', score: 3 },
          ],
        },
      ],
    };
  }

  public componentDidMount(): void {
    this.initPage();
  }

  public render() {
    // @ts-ignore
    const { pageIndex, mySwiper, questions } = this.state;
    console.log('pageIndex', pageIndex);
    return (
      <div className={classnames('index-component', styles.home)} onTouchStart={() => {
        return false;
      }}>
        <div className="swiper-container swiper-no-swiping">
          <div className="swiper-wrapper">
            {/*<div className={pageIndex === 0 ? 'swiper-slide animate' : 'swiper-slide'}>*/}
            {/*{pageIndex === 0 && <EndPage swiper={mySwiper} />}*/}
            {/*</div>*/}
            <div className={pageIndex === 0 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 0 && (
                <SixPage
                  swiper={mySwiper}
                  data={questions[4]}
                  onPrev={realIndex => {
                    // this.handlePrev(realIndex);
                    setTimeout(() => {
                      router.replace('/enter');
                    }, 500);
                  }}
                />
              )}
            </div>
            <div className={pageIndex === 1 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 1 && (
                <FivesPage
                  swiper={mySwiper}
                  data={questions[3]}
                  onPrev={realIndex => {
                    this.handlePrev(realIndex);
                  }}
                />
              )}
            </div>
            <div className={pageIndex === 2 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 2 && (
                <FourthPage
                  swiper={mySwiper}
                  data={questions[2]}
                  onPrev={realIndex => {
                    this.handlePrev(realIndex);
                  }}
                />
              )}
            </div>
            <div className={pageIndex === 3 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 3 && (
                <ThirdPage
                  swiper={mySwiper}
                  data={questions[1]}
                  onPrev={realIndex => {
                    this.handlePrev(realIndex);
                  }}
                />
              )}
            </div>
            <div className={pageIndex === 4 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 4 && (
                <SecondPage
                  swiper={mySwiper}
                  data={questions[0]}
                  onPrev={realIndex => {
                    this.handlePrev(realIndex);
                  }}
                />
              )}
            </div>
            <div className={pageIndex === 5 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 5 && (
                <FirstPage
                  swiper={mySwiper}
                  onPrev={realIndex => {
                    this.handlePrev(realIndex);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private initPage = () => {
    console.log('init');
    const mySwiper = new Swiper('.index-component >.swiper-container', {
      direction: 'vertical',
      loop: false,
      resistanceRatio: 0,
      initialSlide: 6,
      speed: 400,

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      on: {
        slideChange: () => {
          // console.log('realIndex', mySwiper.realIndex);
          // this.setState({ pageIndex: mySwiper.realIndex });
        },
      },
    });

    this.setState({
      mySwiper,
    });
  };

  private handlePrev = realIndex => {
    const { mySwiper } = this.state;
    this.setState(
      {
        pageIndex: realIndex,
      },
      () => {
        mySwiper.slidePrev();
      },
    );
  };
}
