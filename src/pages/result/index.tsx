import { Button, Modal } from 'antd-mobile';
import React from 'react';
import router from 'umi/router';

const styles = require('./index.less');

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

interface IResultState {
  visible: boolean;
  resultData: {
    score: number;
    time: string;
    scoreDetail: [];
    isPass: boolean;
  }
}

class Result extends React.PureComponent<any, IResultState> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      resultData: {
        score: 99.5, time: '12:56', scoreDetail: [], isPass: true,
      },
    }
  }

  public render() {
    const { resultData: { score = 0, time = '00:00', scoreDetail = [], isPass }, visible } = this.state;
    return (
      <div className={styles.result}>
        <div className={styles.card}>
          <div className={styles['img-wrap']}>
            {this.getTitleContent(isPass)}
            <div className={styles.wording}>科目考试成绩</div>
            <div className={styles.score}>{score || 0} 分</div>
            <div className={styles.duration}>答题时长：{time || '00:00'}</div>
          </div>
          <div className={styles.btns}>
            <Button
              type='ghost'
              onClick={() => {
                this.goToWrongPage();
              }}
            >查看错题
            </Button>
            {
              scoreDetail.length > 0 ?
                <div className={styles.buttonGroup}>
                  <Button
                    type='primary'
                    onClick={() => {
                      this.setState({
                        visible: true,
                      });
                    }}
                  >得分明细
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      router.push('/entrance');
                    }}
                  >返回首页
                  </Button>
                </div>
                :
                <Button
                  type="primary"
                  onClick={() => {
                    router.push('/entrance');
                  }}
                >返回首页
                </Button>
            }
          </div>
        </div>
        <Modal
          visible={visible}
          transparent
          wrapClassName={styles['modal-wrap']}
          maskClosable={false}
          onClose={() => this.onClose()}
          title="得分明细"
          footer={[{
            text: '关闭', onPress: () => this.onClose(),
          }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 150, overflow: 'scroll' }}>
            <div className={styles['modal-list-item']}>
              <div className={styles['modal-list-col']}>板块名称</div>
              <div className={styles['modal-list-col']}>及格分数</div>
              <div className={styles['modal-list-col']}>得分</div>
            </div>
            {
              scoreDetail.length > 0 && scoreDetail.map((item, index) => (
                <div className={styles['modal-list-item']} key={index}>
                  <div className={styles['modal-list-col']}>{item.chapterName}</div>
                  <div className={styles['modal-list-col']}>{item.passScore}</div>
                  <div className={styles['modal-list-col']}>{item.score}</div>
                </div>))
            }
          </div>
        </Modal>
      </div>
    );
  }

  private getTitleContent = (isPass) => {
    if (isPass) {
      return (<>
        <div className={styles.title}>恭喜您 <br/> 考试通过啦</div>
        <img src={require('../../assets/h5/pass.jpg')} alt=""/>
      </>);
    }
    return (<>
      <div className={styles.title}>很遗憾 <br/> 您没有通过考试</div>
      <img src={require('../../assets/h5/fail.jpg')} alt=""/>
    </>);

  };

  private onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };

  private onClose = () => {
    this.setState({
      visible: false,
    });
  };

  /**
   * 查看错题
   */
  private goToWrongPage = () => {
    Modal.alert('此功能将在下一步的工作中补全', '谢谢您的期待');
  };

}

export default Result;
