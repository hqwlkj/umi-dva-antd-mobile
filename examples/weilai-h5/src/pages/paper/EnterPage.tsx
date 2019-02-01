// @ts-ignore
import initWx from '@/utils/wx';
import { Picker } from 'antd-mobile';
import classnames from 'classnames';
import { connect } from 'dva';
import React from 'react';
import router from 'umi/router';

const styles = require('./EnterPage.less');
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
    district: Array<{
      value: string;
      label: string;
      children: Array<{ value: string; label: string }>;
    }>;
  };
}

interface IState {
  cityValue: React.ReactText[];
  protocol: boolean;
  phone: string;
  username: string;
  errorMsg: string;
  successMsg: string;
  resultData: Array<{
    minScore: number;
    maxScore: number;
    info: Array<{
      gender: 0 | 1;
      title: string;
      src: string;
    }>;
  }>;
}

const CustomChildren = props => (
  <div onClick={props.onClick} className={styles.pickerInput}>
    <div className={styles.test}>
      <div
        style={{
          flex: 1,
          color: '#17c2c2',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {props.extra}
      </div>
    </div>
  </div>
);

@connect(({ result, loading }) => ({
  result,
  loading: loading.models.result,
}))
class EnterPage extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      cityValue: ['浙江省', '杭州'], // 默认 城市
      protocol: true,
      phone: '',
      username: '',
      successMsg: '',
      errorMsg: '',
      resultData: [
        {
          minScore: 0,
          maxScore: 10,
          info: [
            {
              gender: 0,
              title: '佛系小仙女',
              src: require('../../assets/result/3-2.png'),
            },
            {
              gender: 1,
              title: '公路旅行家',
              src: require('../../assets/result/1-2.png'),
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
            },
            {
              gender: 1,
              title: '公路极客',
              src: require('../../assets/result/6-2.png'),
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
            },
            {
              gender: 1,
              title: '天生赛车手',
              src: require('../../assets/result/5-2.png'),
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
    dispatch({
      type: 'result/getDistrictData',
    });
  }

  public render(): React.ReactNode {
    const { cityValue, protocol, successMsg, errorMsg } = this.state;
    const {
      result: { district },
    } = this.props;
    // @ts-ignore
    const { title = '', src = '' } = this.getResultData();
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
      <div className={styles['enter-page-component']} onTouchStart={() => {
        return false;
      }}>
        {successMsg && <div className={styles['alert-box']}>{successMsg}</div>}
        {errorMsg && (
          <div className={classnames(styles['alert-box'], styles.error)}>{errorMsg}</div>
        )}
        <div className={styles.heander}>
          <img src={require('../../assets/logo.png')} alt="logo" className={styles.logo}/>
          <img src={src} alt="bg" className={styles.innerBg}/>
          <div className={styles['top-text-wrapper']}>
            <p className={styles.info}>你的驾驶人格是</p>
            <p className={styles.resultTitle}>{title}</p>
          </div>
          <div className={styles.desc}>
            马上填写信息，领取你的驾驶人格报告，和最适合你的试驾路线。同时你将有机会获得ES8试驾机会及NIO
            House特饮券。
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles['form-item']}>
            <div className={styles['item-label']}>
              <span>姓名</span>
              <span>*请填写真实姓名</span>
            </div>
            <div className={styles['item-input']}>
              <input
                type="text"
                placeholder={'请填写真实姓名'}
                onChange={e => {
                  this.setState({
                    username: e.target.value,
                    errorMsg: '',
                    successMsg: '',
                  });
                }}
              />
            </div>
          </div>
          <div className={styles['form-item']}>
            <div className={styles['item-label']}>
              <span>电话</span>
              <span>*请填写手机号</span>
            </div>
            <div className={styles['item-input']}>
              <input
                type="number"
                placeholder={'请填写当前正在使用的手机号'}
                onChange={e => {
                  this.setState({
                    phone: e.target.value,
                    errorMsg: '',
                    successMsg: '',
                  });
                }}
                onBlur={() => {
                  window.scrollTo(0, 0);
                }}
              />
            </div>
          </div>
          <div className={styles['form-item']}>
            <div className={styles['item-label']}>
              <span>试驾城市</span>
              <span>*请选试驾城市</span>
            </div>
            <div className={styles['item-input']}>
              <Picker
                title="试驾城市"
                cols={2}
                value={cityValue}
                format={labels => {
                  return labels.join(' / ');
                }}
                data={district}
                onChange={v => this.setState({ cityValue: v, errorMsg: '', successMsg: '' })}
                onOk={v => this.setState({ cityValue: v, errorMsg: '', successMsg: '' }, () => {
                  window.scrollTo(0, 0);
                })}
              >
                <CustomChildren>请选试驾城市</CustomChildren>
              </Picker>
            </div>
          </div>

          <div className={styles['form-item']}>
            <div className={styles['item-label']}>
              <label
                htmlFor=""
                className={styles['checkbox-wrapper']}
                onClick={() => {
                  this.setState({ protocol: !protocol, errorMsg: '', successMsg: '' });
                }}
              >
                <span
                  className={classnames(styles.checkbox, {
                    [styles['checkbox-checked']]: protocol,
                  })}
                >
                  <input type="checkbox" className={styles['checkbox-input']}/>
                  <span className={styles['checkbox-inner']}/>
                </span>
                我同意参与试驾
              </label>
            </div>
          </div>
          <div className={styles['form-item']}>
            <p className={styles.btnInfo}>*个人信息仅供联系试驾使用，不会透露给第三方</p>
            <div
              className={styles.inputBtn}
              onClick={() => {
                // router.push('/result');
                this.handleSubmit();
              }}
            >
              确认提交并领取报告
            </div>
          </div>
        </div>
        <div
          className={styles.backBtn}
          onClick={() => {
            router.replace('/');
          }}
        >
          再试一次 >
        </div>
      </div>
    );
  }

  private getResultData = () => {
    const { resultData } = this.state;
    const {
      result: { score, gender },
    } = this.props;
    const obj = resultData.filter(item => item.minScore <= score && item.maxScore >= score)[0] || {
      info: [],
    };
    let data = {};
    if (obj) {
      data = obj.info.filter(item => item.gender === gender)[0] || {};
    }
    return data;
  };

  private handleSubmit = () => {
    const { username, phone, protocol, cityValue } = this.state;
    if (username.length === 0) {
      this.setState({ errorMsg: '请填写真实姓名' }, () => {
        setTimeout(() => {
          this.setState({ errorMsg: '' });
        }, 5000);
      });
      return;
    }
    if (phone.length === 0) {
      this.setState({ errorMsg: '请填写手机号' });
      return;
    }
    if (
      !new RegExp('^0?(13[0-9]|14[579]|15[0-35-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$').test(
        phone,
      )
    ) {
      this.setState({ errorMsg: '请输入正确的手机号码' });
      return;
    }

    if (cityValue.length === 0) {
      this.setState({ errorMsg: '请选试驾城市' });
      return;
    }

    const { dispatch } = this.props;

    dispatch({
      type: 'result/submit',
      payload: {
        fullName: username,
        phone,
        province: cityValue[0],
        city: cityValue[1],
        cityValue: cityValue.join('/'),
        myFellow: protocol,
      },
      callback: response => {
        console.log('response', response);
        if (response) {
          this.setState({ successMsg: '提交成功' });
        } else {
          this.setState({ successMsg: response.message });
        }
      },
    });
  };
}

export default EnterPage;
