import { Button, Modal } from 'antd-mobile';
import classnames from 'classnames';
import { connect } from 'dva';
import LS from 'parsec-ls';
import React, { Fragment } from 'react';
import Circle from 'react-circle';
import router from 'umi/router';
import * as theme from '../../theme';

const styles = require('./index.less');

interface IPaperState {
  current: number; // 当前题目下标
  selected: [] | any;
  answers:
    | Array<{
        questionId: number;
        answer: [];
      }>
    | any;
  type: string;
}

interface ITextPaperProps {
  dispatch?: any;
  h5: {
    questions: Array<{
      id: number;
      status: 'ONLINE' | 'OFFLINE';
      description: string;
      options: string[];
      answers: number[];
      userAnswer?: number[];
      chapterID: number;
      sectionID: number;
      wrongTimes: number;
      testTimes: number;
      createAt: string;
      updateAt: string;
    }>;
  };
}

@connect(({ h5, loading }) => ({
  h5,
  loading: loading.models.h5,
}))
class Index extends React.PureComponent<ITextPaperProps, IPaperState> {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      selected: [],
      answers: [],
      type: props.match.params.type,
    };
  }

  public componentDidMount() {
    const { type } = this.state;
    if (type === '') {
      this.loadWrongQuestions();
    }
  }

  public render() {
    const {
      h5: { questions },
    } = this.props;
    return (
      <div className={styles['test-paper']}>
        {questions && questions.length > 0 ? (
          this.getPaperContent()
        ) : (
          <Fragment>
            <div className={styles['top-wrap']}>
              <div className={styles.title}>模拟考试试卷</div>
              <div
                className={styles.back}
                onClick={() => {
                  router.push('/entrance');
                }}
              >
                返回首页
              </div>
              <div className={styles['empty-content']}>
                <img src={require('../../assets/h5/empty.svg')} style={{ width: 100 }} />
                <div>没有任何模拟考试试题信息</div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }

  /**
   * 获取题型
   * @param answers
   * @param options
   * @returns {string}
   */
  private getQuestionsType = (answers, options) => {
    if (options && answers) {
      if (options.length === 2 && answers.length === 1) {
        return '判断题';
      } else if (options.length > 2 && answers.length > 1) {
        return '多选题';
      } else {
        return '单选题';
      }
    } else {
      return '单选题';
    }
  };

  /**
   * 提交试卷答题信息
   */
  private handleTestSubmit = () => {
    Modal.alert('确认提交本次考试成绩吗？', '', [
      { text: '继续考试', onPress: () => console.log('继续考试') },
      {
        text: '确认交卷',
        onPress: () => {
          this.submitTestResult();
        },
      },
    ]);
  };

  /**
   * 提交试卷结果
   * @returns {Promise<void>}
   */
  private submitTestResult = async () => {
    await this.handleFilterWrongQuestionsId();
    const { dispatch } = this.props;
    let answers = [];
    if (LS.getObj('exam-test') !== null) {
      const examTest = LS.getObj('exam-test');
      answers = examTest.answers || [];
    }

    dispatch({
      type: 'h5/submit',
      payload: {
        paperId: LS.getObj('exam-paper').id,
        answers,
      },
    });
  };

  /**
   * 获取试卷中的错题 ID 信息
   */
  private handleFilterWrongQuestionsId = () => {
    const {
      h5: { questions = [] },
    } = this.props;
    if (LS.getObj('exam-test') != null) {
      const { answers = [] } = LS.getObj('exam-test');
      if (questions && questions.length > 0) {
        if (answers && answers.length > 0) {
          // 有用户选择的答案时
          const wrongIds = [];
          answers.map(item => {
            if (item && item.answer) {
              const question = questions.filter(x => x.id === item.questionId)[0];
              const qanswers = question.answers.sort().join(',');
              const answerStr = item.answer.sort().join(',');
              if (qanswers.toString() !== answerStr.toString()) {
                wrongIds.push(item.questionId);
              }
            }
          });
          LS.setObj('wrong_ids', wrongIds);
        } else {
          // 用户没有选择 则错题为全部错题
          const wrongIds = [];
          questions.map(item => {
            wrongIds.push(item.id);
          });
          LS.setObj('wrong_ids', wrongIds);
        }
      }
    } else {
      const wrongIds = [];
      questions.map(item => {
        wrongIds.push(item.id);
      });
      LS.setObj('wrong_ids', wrongIds);
    }
  };

  /**
   * 渲染试题 一页一题
   * @returns {*}
   */
  private getPaperContent = () => {
    let { current, selected } = this.state;
    const { answers, type } = this.state;
    const {
      h5: { questions },
    } = this.props;
    const question = questions.length > 0 ? questions[current] : undefined;
    const questionsType =
      question !== undefined ? this.getQuestionsType(question.answers, question.options) : '--';
    return (
      <Fragment>
        <div className={styles['top-wrap']}>
          <div className={styles.title}>驾驶员从业资格模拟考试</div>
          <div className={styles.category}>{questionsType}</div>
          <div
            className={styles.back}
            onClick={() => {
              if (type === 'test') {
                Modal.alert('确认提交本次考试成绩吗？', '', [
                  {
                    text: '确认交卷',
                    onPress: () => {
                      LS.setObj('exam-test', { current, questions, answers });
                      this.submitTestResult();
                    },
                  },
                  { text: '继续考试', onPress: () => console.log('ok') },
                ]);
              }
              if (type === 'preview' || type === 'wrong') {
                router.push('/entrance');
              }
            }}
          >
            {type === 'test' ? `交   卷` : '返回首页'}
          </div>
          <div className={styles.question}>
            {question !== undefined && (
              <>
                <div className={styles.description}>{question.description || '--'}</div>
                <div className={styles.options}>
                  {question.options.map((item, index) => (
                    <div
                      key={`option-${index}`}
                      className={classnames(styles.option, {
                        [styles.correct]:
                          (type === 'preview' || type === 'wrong') &&
                          question.answers.filter(x => x === index).length > 0,
                        [styles['opt-selected-wrong']]:
                          type === 'wrong' &&
                          question.userAnswer.filter(x => x === index).length > 0,
                        [styles['opt-selected']]:
                          type === 'test' && (selected.filter(x => x === index) || []).length > 0,
                      })}
                    >
                      <input
                        type="checkbox"
                        checked={selected.filter(x => x === index).length > 0}
                        className={styles['checkbox-input']}
                        onChange={e => {
                          if (questionsType === '多选题') {
                            if (e.target.checked) {
                              answers.push(index);
                            } else {
                              selected = selected.filter(x => x !== index);
                            }
                          } else if (e.target.checked) {
                            selected = [];
                            selected.push(index);
                          } else {
                            selected = selected.filter(x => x !== index);
                          }
                          this.setState({ selected });
                        }}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          <Button
            type="ghost"
            className={styles['btn-enter']}
            disabled={current === 0}
            onClick={() => {
              this.setState({ current: current -= 1 }, () => {
                if (type === 'test' && answers.length > 0) {
                  const obj = answers.filter(x => x.questionId === questions[current].id)[0] || {};
                  if (obj.answer) {
                    this.setState({ selected: obj.answer });
                  }
                }
              });
            }}
          >
            上一题
          </Button>
          <div className={styles['circle-progress']}>
            <Circle
              animate // Boolean: Animated/Static progress
              animationDuration="1s" // String: Length of animation
              responsive={false} // Boolean: Make SVG adapt to parent size
              size="60" // String: Defines the size of the circle.
              lineWidth="30" // String: Defines the thickness of the circle's stroke.
              progress={parseInt(((current / (questions.length - 1)) * 100).toFixed(0), 0)} // String: Update to change the progress and percentage.
              progressColor={theme.primaryColor} // String: Color of "progress" portion of circle.
              bgColor="#ecedf0" // String: Color of "empty" portion of circle.
              textColor="#6b778c" // String: Color of percentage text color.
              percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
              roundedStroke={false} // Boolean: Rounded/Flat line ends
              showPercentage // Boolean: Show/hide percentage.
              showPercentageSymbol
            />
          </div>
          <Button
            type="primary"
            className={styles['btn-enter']}
            disabled={type !== 'test' && current === questions.length - 1}
            onClick={() => {
              const nextIndex = current + 1;
              if (type === 'test' && nextIndex <= questions.length - 1) {
                if (
                  answers.length > 0 &&
                  answers.filter(x => x.questionId === questions[nextIndex].id).length > 0
                ) {
                  const obj =
                    answers.filter(x => x.questionId === questions[nextIndex].id)[0] || {};
                  if (obj.answer) {
                    this.setState({ selected: obj.answer, current: current += 1 });
                  }
                } else if (selected.length === 0) {
                  Modal.alert('请选择至少一个选项', '');
                } else {
                  answers.push({
                    questionId: question.id,
                    answer: selected,
                  });
                  this.setState({ current: current += 1, selected: [], answers }, () => {
                    // TODO: 将本次考试信息 存储在本地
                    LS.setObj('exam-test', { current, questions, answers });
                  });
                }
              } else if (type === 'test') {
                if (selected.length === 0) {
                  Modal.alert('请选择至少一个选项', '');
                  return;
                }
                this.handleTestSubmit();
              } else {
                this.setState({ current: current += 1 });
              }
            }}
          >
            {type === 'test' && current === questions.length - 1 ? '交卷' : '下一题'}
          </Button>
        </div>
      </Fragment>
    );
  };

  private loadWrongQuestions = () => {
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
  };

  private getUserSelectAnswer = (answers, id) => {
    if (answers && answers.length > 0) {
      return answers.filter(x => x.questionId === id)[0].answer;
    }
    return [];
  };
}

export default Index;
