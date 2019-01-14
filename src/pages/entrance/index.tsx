import { Button, Icon, Modal, Picker, Toast } from 'antd-mobile';
import classNames from 'classnames';
import LS from 'parsec-ls';
import React from 'react';
import router from 'umi/router';
import * as theme from '../../theme';

const styles = require('./index.less');


interface IEntranceState {
  selected: number;
  chapterValue: [];
  chapterLabel: string;
  visible: boolean;
}

class index extends React.Component<any, IEntranceState> {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      chapterValue: [],
      chapterLabel: '请选择章节',
      visible: false,
    };
  }

  public render() {
    const { selected, chapterValue, chapterLabel, visible } = this.state;
    // @TODO 数据 都从 mock 中生成
    const questionTotal = 100;
    const chapterDataOptions = [{ label: '章节名称1', value: '1' }, { label: '章节名称2', value: '2' }, {
      label: '章节名称3',
      value: '3',
    }, { label: '章节名称4', value: '4' }];
    return (
      <div className={styles.entranceBox}>
        <div className={styles.title}>网约车从业资格证</div>
        <div className={styles.subtitle}>考题练习及模拟考试</div>
        <div
          className={classNames(styles['select-item'], styles['opt-large'], {
            [styles['opt-selected']]: selected === 1,
          })}
          onClick={() => {
            this.setState({ selected: 1, chapterValue: [], chapterLabel: '请选择章节' }, () => {
              this.getChapterData(1);
            });
          }}
        >
          全国公共科目考试题库
        </div>
        <div
          className={classNames(styles['select-item'], styles['opt-large'], {
            [styles['opt-selected']]: selected === 7,
          })}
          onClick={() => {
            this.setState({ selected: 7, chapterValue: [], chapterLabel: '请选择章节' }, () => {
              this.getChapterData(7);
            });
          }}
        >
          本地区域科目考试题库
        </div>
        <Picker
          extra="请选择(可选)"
          data={chapterDataOptions}
          cols={1}
          title="请选择章节"
          value={chapterValue}
          onOk={e => {
            this.setState({
              chapterValue: e,
              chapterLabel: chapterDataOptions.filter(x => x.value === e[0])[0].label,
            });
          }}
        >
          <div className={styles['select-item']}>{chapterLabel}</div>
        </Picker>
        <div className={styles.bottom}>
          <Button
            type="primary"
            onClick={() => {
              this.getPaper(2);
            }}
          >
            考题预习
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.getPaper(3);
            }}
          >
            模拟考试
          </Button>
        </div>
        <Modal
          visible={visible}
          transparent={true}
          wrapClassName={styles['modal-wrap']}
          maskClosable={false}
          onClose={() => {
            this.setState({
              visible: false,
            });
          }}
          title={null}
          footer={[
            {
              text: '开始考试',
              onPress: () => {
                this.startTheExam();
              },
              style: { background: theme.primaryColor, color: '#ffffff', fontSize: 14 },
            },
          ]}
        >
          <div className={styles['modal-container']}>
            <div className={styles['modal-header']}>
              <div
                className={styles.closeBtn}
                onClick={() => {
                  Modal.alert('确认放弃本次考试吗？', '', [
                    { text: '放弃考试', onPress: () => this.setState({ visible: false }) },
                    { text: '继续考试' },
                  ]);
                }}
              >
                <Icon type="cross"/>
              </div>
              <div className={styles.avatar}>
                <img src={require('../../assets/h5/avatar.png')} alt="avatar"/>
              </div>
              <div className={styles['name-wrap']}>
                滴滴 <span>师傅</span>
              </div>
            </div>
            <div className={styles['modal-body']}>
              <div className={styles['desc-item']}>
                <div className={styles['item-label']}>考试科目：</div>
                <div className={styles['item-value']}>北京市出租汽车驾驶员从业资格模拟考试</div>
              </div>
              <div className={styles['desc-item']}>
                <div className={styles['item-label']}>试题数量：</div>
                <div className={styles['item-value']}>
                  <span>{questionTotal}</span> 题
                </div>
              </div>
              <div className={styles['desc-item']}>
                <div className={styles['item-label']}>考试时间：</div>
                <div className={styles['item-value']}>
                  共 <span>80</span> 分钟 （公共科目
                  <span>50</span>
                  分钟，区域科目
                  <span>30</span>
                  分钟）
                </div>
              </div>
              <div className={styles['desc-item']}>
                <div className={styles['item-label']}>合格标准：</div>
                <div className={styles['item-value']}>
                  <p>
                    公共科目
                    <span>40分</span>
                    及格，满分
                    <span>50分</span>；
                  </p>
                  <p>
                    区域科目-理论知识
                    <span>32分</span>
                    及格，满分
                    <span>40分</span>；
                  </p>
                  <p>
                    区域科目-运营实务
                    <span>8分</span>
                    及格，满分
                    <span>10分</span>；
                  </p>
                  <p>
                    每题
                    <span>1分</span>
                    ，共计
                    <span>100题</span>
                    ，总分
                    <span>100分</span>；
                  </p>
                </div>
              </div>
              <div className={styles.notice} style={{ display: 'none' }}>
                温馨提示：按照驾管部要求，考试不能修改答案，每做一题，系统自动计算错题数。
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  /**
   * 获取试题
   * @param step
   */
  public getPaper = step => {
    const { selected, chapterValue } = this.state;
    if (step === 2 && (selected === -1 || chapterValue.length === 0)) {
      Modal.alert('请选择地区和章节', '');
      return;
    }
    // @ts-ignore
    LS.setObj('drip-region', { chapterId: selected, sectionId: chapterValue[0] });
    if (step === 2) {
      // @TODO 生成考题预习
      router.push('/paper/preview');
    } else {
      // @TODO 生成考试试卷
      this.setState({
        visible: true,
      },()=>{
        // @TODO 将生成的试卷信息 存储在本地缓存中
        LS.setObj('drip-exam-paper', {});
      });

    }
  };

  /**
   * 取得一级或二级章节列表
   */
  private getChapterData = (parentID: number) => {
    const { dispatch } = this.props;
    console.log('dispatch', dispatch);
    Toast.loading('加载中...');
  };

  /**
   * 开始考试
   */
  private startTheExam = () => {
    console.log('');
    router.push('/paper/test');
  };
}

export default index;
