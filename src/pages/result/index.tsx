import { Button } from 'antd-mobile';
import { connect } from 'dva';
import LS from 'parsec-ls';
import React from 'react';
import router from 'umi/router';

const styles = require('./index.less');

interface IResultState {
  resultData: {
    score: number;
    time: string;
    isPass: boolean;
  };
}

@connect(({ h5, loading }) => ({
  h5,
  loading: loading.models.h5,
}))
class Result extends React.PureComponent<any, IResultState> {
  constructor(props) {
    super(props);
    const {
      h5: {
        resultData: { score = 0, time = '00:00', isPass },
      },
    } = props;
    this.state = {
      resultData: {
        score,
        time,
        isPass,
      },
    };
  }

  public componentDidMount() {
    if (LS.getObj('exam-test-result') === null) {
      router.push('/');
      return;
    }
    const { result } = LS.getObj('exam-test-result');
    const { resultData } = this.state;
    if (result) {
      this.setState({
        resultData: {
          ...resultData,
          ...result,
        },
      });
    }
  }

  public render() {
    const {
      resultData: { score = 0, time = '00:00', isPass },
    } = this.state;
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
              type="ghost"
              onClick={() => {
                this.goToWrongPage();
              }}
            >
              查看错题
            </Button>
            <Button
              type="primary"
              onClick={() => {
                router.push('/entrance');
              }}
            >
              返回首页
            </Button>
          </div>
        </div>
      </div>
    );
  }

  private getTitleContent = isPass => {
    if (isPass) {
      return (
        <>
          <div className={styles.title}>
            恭喜您 <br /> 考试通过啦
          </div>
          <img src={require('../../assets/h5/pass.jpg')} alt="" />
        </>
      );
    }
    return (
      <>
        <div className={styles.title}>
          很遗憾 <br /> 您没有通过考试
        </div>
        <img src={require('../../assets/h5/fail.jpg')} alt="" />
      </>
    );
  };
  /**
   * 查看错题
   */
  private goToWrongPage = () => {
    const { dispatch } = this.props;
    const examResult = LS.getObj('exam-test-result');
    let data = [];
    if (examResult !== null) {
      const {
        result: { wrong_ids = [] },
        questions = [],
        answers = [],
      } = examResult;
      data = wrong_ids
        .map(id => ({
          ...(questions.filter(x => x.id === id)[0] || {}),
          userAnswer: this.getUserSelectAnswer(answers, id),
        }))
        .filter(x => x !== null);
    }
    // 先获取一遍数据 避免 js 报错
    dispatch({
      type: 'h5/savePaperData',
      payload: {
        questions: data,
        paper: LS.getObj('exam-paper') || {},
      },
    });
    router.push('/paper/wrong');
  };

  private getUserSelectAnswer = (answers, id) => {
    if (answers && answers.length > 0) {
      return answers.filter(x => x.questionId === id)[0].answer;
    }
    return [];
  };
}

export default Result;
