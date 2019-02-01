// @ts-ignore
import initWx from '@/utils/wx';
import { connect } from 'dva';
import LS from 'parsec-ls';
import React, { RefObject } from 'react';
import CountUp from 'react-countup';
import router from 'umi/router';

const styles = require('./index.less');
const shareIcon = require('@/assets/share-icon.jpeg');

function isWeixn() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('micromessenger');
}

interface IProps {
  dispatch: any;
  result: {
    gender: number;
    score: number;
  };
}

interface IResultState {
  mainDom?: RefObject<HTMLDivElement>;
  resultSrc: string;
  resultData: Array<{
    minScore: number;
    maxScore: number;
    info: Array<{
      gender: 0 | 1;
      title: string;
      src: string;
      imgSrc?: string;
      desc: string | React.ReactNode;
      msg: string | React.ReactNode;
      mapData: {
        mapSrc: string;
        time: number;
        distance: number;
      };
    }>;
  }>;
}

@connect(({ result, loading }) => ({
  result,
  loading: loading.models.result,
}))
class Result extends React.PureComponent<IProps, IResultState> {
  constructor(props) {
    super(props);
    this.state = {
      resultSrc: '',
      mainDom: React.createRef(),
      resultData: [
        {
          minScore: 0,
          maxScore: 10,
          info: [
            {
              gender: 0,
              title: '佛系小仙女',
              src: require('../../assets/result/3-2.png'),
              desc: (
                <span>
                  态度要端正，姿势要优美
                  <br/>
                  马路上你是佛系小仙女
                  <br/>
                  开慢车不是技术不行，只是沉醉于沿途风景
                </span>
              ),
              msg: (
                <span>
                  驾驶ES8，你最适合一条 最美试驾路线
                  <br/>
                  尽享四季西子湖畔
                </span>
              ),
              mapData: { mapSrc: require('../../assets/result/3-1.png'), time: 30, distance: 10 },
            },
            {
              gender: 1,
              title: '公路旅行家',
              src: require('../../assets/result/1-2.png'),
              desc: (
                <span>
                  拒绝路怒症，路遇拥堵放首歌
                  <br/>
                  有车插队我让行，不闻马路喧嚣鸣笛
                  <br/>
                  只见窗外风景怡然
                </span>
              ),
              msg: (
                <span>
                  驾驶ES8，你最适合一条 最美试驾路线
                  <br/>
                  尽享四季西子湖畔
                </span>
              ),
              mapData: { mapSrc: require('../../assets/result/1-1.png'), time: 30, distance: 10 },
            },
          ],
        },
        {
          minScore: 11,
          maxScore: 15,
          info: [
            {
              gender: 0,
              title: '公路哲学家',
              src: require('../../assets/result/4-2.png'),
              desc: (
                <span>
                  对于驾驶总有自己的哲学思考
                  <br/>
                  身体和灵魂两个都要在路上
                  <br/>
                  不走寻常路是你的人生态度
                </span>
              ),
              msg: (
                <span>
                  驾驶ES8，你最适合一条品质小众路线
                  <br/>
                  深度体验黑科技
                </span>
              ),
              mapData: { mapSrc: require('../../assets/result/4-1.png'), time: 40, distance: 24 },
            },
            {
              gender: 1,
              title: '公路极客',
              src: require('../../assets/result/6-2.png'),
              desc: (
                <span>
                  朋友圈里人称活地图，另辟蹊径你最拿手
                  <br/>
                  不执著于速度的刺激
                  <br/>
                  而追求于科技带来的惊喜
                </span>
              ),
              msg: (
                <span>
                  驾驶ES8，你最适合一条 品质小众路线，
                  <br/>
                  深度体验黑科技
                </span>
              ),
              mapData: { mapSrc: require('../../assets/result/6-1.png'), time: 40, distance: 15 },
            },
          ],
        },
        {
          minScore: 16,
          maxScore: 25,
          info: [
            {
              gender: 0,
              title: '公路女王',
              src: require('../../assets/result/2-2.png'),
              desc: (
                <span>
                  你主宰生活，也要主宰马路。谁说女司机不
                  <br/>
                  靠谱，开自己的路，让别人说去吧
                  <br/>
                  Catch me，if you can
                </span>
              ),
              msg: (
                <span>
                  驾驶ES8，你最适合一条极致体验路线
                  <br/>
                  百公里加速定义速度与激情
                </span>
              ),
              mapData: { mapSrc: require('../../assets/result/2-1.png'), time: 30, distance: 8.3 },
            },
            {
              gender: 1,
              title: '天生赛车手',
              src: require('../../assets/result/5-2.png'),
              desc: (
                <span>
                  出了停车场就是赛车场
                  <br/>
                  超车是你的态度，加速是你的风度
                  <br/>
                  一出发，再也没有慢下来的理由
                </span>
              ),
              msg: (
                <span>
                  驾驶ES8，你最适合一条极致体验路线
                  <br/>
                  百公里加速定义速度与激情
                </span>
              ),
              mapData: { mapSrc: require('../../assets/result/5-1.png'), time: 30, distance: 8.3 },
            },
          ],
        },
      ],
    };
  }

  public componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: 'result/fetch',
    });
  }

  public render() {
    const { mainDom, resultSrc } = this.state;
    // @ts-ignore
    const { title, src, imgSrc, desc, msg, mapData: { mapSrc, time, distance } } = this.getResultData();
    if (isWeixn() && !!title) {
      initWx({
        title: `试驾蔚来ES8，我的驾驶人格是${title}`,
        imgUrl: shareIcon,
        isNeedLogin: true,
        desc: '试驾蔚来ES8，认识路上的自己',
        openid: process.env.NODE_ENV === 'development' ? 'oEgayjggrU06oORZJVeFUJ_KF1Mk' : undefined,
      });
    }
    return (
      <React.Fragment>
        <div className={styles.result} onTouchStart={() => {
          return false;
        }}>
          <div className={styles.domain} ref={mainDom}>
            <div className={styles.headerWrapper}>
              <img src={require('../../assets/logo.png')} alt="logo" className={styles.logo}/>
              <img src={src} alt="logo" className={styles.innerBg}/>
              <div className={styles['top-text-wrapper']}>
                <p className={styles.info}>你的驾驶人格是</p>
                <p className={styles.resultTitle}>{title}</p>
              </div>
              <div className={styles['result-desc']}>{desc}</div>
            </div>
            <div className={styles['map-wrapper']}>
              <div className={styles['map-box']}>
                <img src={mapSrc} alt="map"/>
              </div>
              <div className={styles['map-info']}>
                <div className={styles['info-item']}>
                  <span>DISTANCE</span>
                  <div className={styles.unit}>
                    <CountUp start={0} end={distance} delay={1}/>
                    km
                  </div>
                </div>
                <div className={styles['info-item']}>
                  <span>TIME</span>
                  <div className={styles.unit}>
                    <CountUp
                      start={0}
                      end={time}
                      delay={1.3}
                      onEnd={() => {
                        this.handleCreate();
                      }}
                    />
                    min
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['footer-text']}>{msg}</div>
            <div className={styles['footer-text-info']}>
              *结果页显示的试驾路线位于杭州，其他城市仅供示意
            </div>
            <div className={styles['share-wrapper']}>
              <div className={styles['share-info']}>
                <p>长按保存图片分享好友</p>
                <p>(蔚来APP内请点击保存)</p>
              </div>
              <div className={styles.qrcode}>
                <img src={require('../../assets/1548314593.png')} alt=""/>
              </div>
            </div>
          </div>
          {resultSrc &&
            <img src={resultSrc} alt="" style={{ width: '100%', objectFit: 'contain', pointerEvents: 'visible' }}/>}
        </div>
      </React.Fragment>
    );
  }

  private getResultData = () => {
    const { resultData } = this.state;
    let {
      result: { score, gender },
    } = this.props;

    if (LS.getObj('answers') === null || LS.get('gender') === null) {
      router.push('/');
      return '';
    }
    const answers = LS.getObj('answers');
    gender = LS.getObj('gender');
    score = 0;
    answers.map(answer => {
      return (score += answer.score);
    });
    const obj = resultData.filter(item => item.minScore <= score && item.maxScore >= score)[0] || {
      info: [],
    };
    let data: {
      minScore: number;
      maxScore: number;
      info: Array<{
        gender: 0 | 1;
        title: string;
        src: string;
        imgSrc?: string;
        desc: string | React.ReactNode;
        msg: string | React.ReactNode;
        mapData: {
          mapSrc: string;
          time: number;
          distance: number;
        };
      }>
    };
    if (obj) {
      data = obj.info.filter(item => item.gender === gender)[0] || {};
    }
    return data;
  };

  /**
   * 生成图片
   */
  private handleCreate = () => {
    const {
      mainDom: { current: mainDom },
    } = this.state;
    if (mainDom === null) {
      return;
    }
    let isCreacting = true;
    mainDom.style.display = 'block';
    // @ts-ignore
    import('@/utils/html2canvas.min.js')
      .then(({ default: html2canvas }) =>
        html2canvas(mainDom, {
          useCORS: true,
          allowTaint: true, //  允许加载跨域的图片
          taintTest: true, //  检测每张图片都已经加载完成
          height: mainDom.clientHeight,
          width: mainDom.clientWidth,
          backgroundColor: '#00263c',
          scale: 2,
          letterRendering: true, // 在设置了字间距的时候有用
          logging: true,
        }),
      )
      .then(canvas => {
        setTimeout(() => {
          if (isCreacting) {
            isCreacting = false;
            alert('您的手机版本过低，请升级至最新版本后重新打开。');
          }
        }, 2000);
        const resultSrc = canvas.toDataURL('image/png');
        console.log('resultSrc', resultSrc);
        this.setState({ resultSrc }, () => {
          mainDom.style.display = 'none';
          isCreacting = false;
        });
      });
  };
}

export default Result;
