import { Button, Modal, Toast } from 'antd-mobile';
import classnames from 'classnames';
import LS from 'parsec-ls';
import React, { Fragment } from 'react';
import Circle from 'react-circle';
import router from 'umi/router';
import * as theme from '../../theme';

const styles = require('./index.less');

const questions: Array<{
  id: number;
  status: 'ONLINE' | 'OFFLINE';
  description: string;
  options: string;
  answers: string;
  chapterID: number;
  sectionID: number;
  wrongTimes: number;
  testTimes: number;
  createAt: string;
  updateAt: string;
}> = [{
  'id': 570,
  'status': 'ONLINE',
  'description': '网约车车辆经营许可期限自车辆注册之日起不超过（）年。',
  'options': '["7年", "8年", "9年", "10年"]',
  'answers': '[1]',
  'chapterID': 7,
  'sectionID': 9,
  'wrongTimes': 148,
  'testTimes': 1026,
  'createAt': '2018-12-26 15:44:59',
  'updateAt': '2018-12-26 15:44:59',
}, {
  'id': 460,
  'status': 'ONLINE',
  'description': '请根据英语语音,选择正确答案:baggage',
  'options': '["零钱", "行李", "等候", "车号"]',
  'answers': '[1]',
  'chapterID': 7,
  'sectionID': 8,
  'wrongTimes': 731,
  'testTimes': 1130,
  'createAt': '2018-12-26 15:44:41',
  'updateAt': '2018-12-26 15:44:41',
}, {
  'id': 403,
  'status': 'ONLINE',
  'description': '驾驶出租汽车遇到窄路、坡道、急转弯处会车时，要低速慢行，必要时停车等待。',
  'options': '["对", "错"]',
  'answers': '[0]',
  'chapterID': 1,
  'sectionID': 4,
  'wrongTimes': 300,
  'testTimes': 408,
  'createAt': '2018-12-26 15:44:29',
  'updateAt': '2018-12-26 15:44:29',
}, {
  'id': 11,
  'status': 'ONLINE',
  'description': '出租汽车驾驶员注册有效期届满需继续从事出租汽车客运服务的,应当在有效期届满前（）内申请延续注册。',
  'options': '["5日", "10日", "20日", "30日"]',
  'answers': '[3]',
  'chapterID': 1,
  'sectionID': 2,
  'wrongTimes': 415,
  'testTimes': 808,
  'createAt': '2018-12-26 15:43:21',
  'updateAt': '2018-12-26 15:43:21',
}, {
  'id': 857,
  'status': 'ONLINE',
  'description': '当巡游车计程计价设备发生故障时，可以与乘客议价继续运营。',
  'options': '["对", "错"]',
  'answers': '[1]',
  'chapterID': 7,
  'sectionID': 12,
  'wrongTimes': 539,
  'testTimes': 674,
  'createAt': '2018-12-26 15:45:49',
  'updateAt': '2018-12-26 15:45:49',
}, {
  'id': 438,
  'status': 'ONLINE',
  'description': '出租汽车驾驶员应自觉遵守法律法规和服务规范，牢固树立（）的观念。',
  'options': '["经济效益第一", "安全运营，优质服务", "全运营与经济利益并重", "效率至上，快速运送"]',
  'answers': '[1]',
  'chapterID': 1,
  'sectionID': 5,
  'wrongTimes': 166,
  'testTimes': 604,
  'createAt': '2018-12-26 15:44:34',
  'updateAt': '2018-12-26 15:44:34',
}, {
  'id': 715,
  'status': 'ONLINE',
  'description': '新华通讯社位于“前三门大街”沿线，向西临近中央音乐学院。',
  'options': '["对", "错"]',
  'answers': '[0]',
  'chapterID': 7,
  'sectionID': 11,
  'wrongTimes': 10,
  'testTimes': 875,
  'createAt': '2018-12-26 15:45:24',
  'updateAt': '2018-12-26 15:45:24',
}, {
  'id': 249,
  'status': 'ONLINE',
  'description': '无障碍出租汽车应保证充足空间安放轮椅。',
  'options': '["对", "错"]',
  'answers': '[0]',
  'chapterID': 1,
  'sectionID': 3,
  'wrongTimes': 947,
  'testTimes': 1824,
  'createAt': '2018-12-26 15:44:03',
  'updateAt': '2018-12-26 15:44:03',
}, {
  'id': 889,
  'status': 'ONLINE',
  'description': '巡游车和网约车均应当依法经营、诚实守信、市场定价、优质服务。',
  'options': '["对", "错"]',
  'answers': '[1]',
  'chapterID': 1,
  'sectionID': 6,
  'wrongTimes': 865,
  'testTimes': 1603,
  'createAt': '2018-12-26 16:00:20',
  'updateAt': '2018-12-26 16:00:20',
}, {
  'id': 594,
  'status': 'ONLINE',
  'description': '纯电动汽车从电网取电获得电力，并通过动力蓄电池向驱动电机提供电能驱动汽车行驶。',
  'options': '["对", "错"]',
  'answers': '[0]',
  'chapterID': 7,
  'sectionID': 10,
  'wrongTimes': 991,
  'testTimes': 1911,
  'createAt': '2018-12-26 15:45:03',
  'updateAt': '2018-12-26 15:45:03',
}];

interface IPaperState {
  current: number; // 当前题目下标
  selected: [] | any;
  answers: Array<{
    questionId: number;
    answer: [];
  }> | any;
  type: string;
}

class index extends React.PureComponent<any, IPaperState> {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      selected: [],
      answers: [],
      type: props.match.params.type,
    };
  }

  /**
   * 获取题型
   * @param answers
   * @param options
   * @returns {string}
   */
    // @ts-ignore
  private getQuestionsType = (answers: string, options: string) => {
    if (options && answers) {
      const a = JSON.parse(answers || '[]');
      const o = JSON.parse(options || '[]');
      if (o.length === 2 && a.length === 1) {
        return '判断题';
      }
      if (o.length > 2 && a.length === 1) {
        return '单选题';
      }
      if (o.length > 2 && a.length > 1) {
        return '多选题';
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
    Toast.loading('提交答案中...');
    setTimeout(() => {
      Toast.hide();
      router.push('/result');
    }, 3 * 1000);
  };

  /**
   * 获取试卷中的错题 ID 信息
   */
  private handleFilterWrongQuestionsId = () => {
    if (LS.getObj('drip-exam') != null) {
      const { answers = [] } = LS.getObj('drip-exam');
      if (questions && questions.length > 0) {
        if (answers && answers.length > 0) {
          // 有用户选择的答案时
          const wrongIds = [];
          answers.map(item => {
            if (item && item.answer) {
              const question = questions.filter(x => x.id === item.questionId)[0];
              const qanswers = JSON.parse(question.answers || '[]')
                .sort()
                .join(',');
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
                      LS.setObj('drip-exam', { current, questions, answers });
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
                <div className={styles.description}>
                  {question.description || '--'}
                </div>
                <div className={styles.options}>
                  {JSON.parse(question.options || '[]').map((item, index) => (
                    <div
                      key={`option-${item.id}`}
                      className={classnames(styles.option, {
                        [styles.correct]:
                        (type === 'preview' || type === 'wrong') &&
                        JSON.parse(question.answers || '[]').filter(x => x === index).length > 0,
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
              this.setState({ current: (current -= 1) }, () => {
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
                  const obj = answers.filter(x => x.questionId === questions[nextIndex].id)[0] || {};
                  if (obj.answer) {
                    this.setState({ selected: obj.answer, current: (current += 1) });
                  }
                } else if (selected.length === 0) {
                  Modal.alert('请选择至少一个选项', '');
                } else {
                  answers.push({
                    questionId: question.id,
                    answer: selected,
                  });
                  this.setState({ current: (current += 1), selected: [], answers }, () => {
                    // TODO: 将本次考试信息 存储在本地
                    LS.setObj('drip-exam', { current, questions, answers });
                  });
                }
              } else if (type === 'test') {
                if (selected.length === 0) {
                  Modal.alert('请选择至少一个选项', '');
                  return;
                }
                this.handleTestSubmit();
              } else {
                this.setState({ current: (current += 1) });
              }
            }}
          >
            {type === 'test' && current === questions.length - 1 ? '交卷' : '下一题'}
          </Button>
        </div>
      </Fragment>
    );
  };

  public render() {
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
                <img src={require('../../assets/h5/empty.svg')} style={{ width: 100 }}/>
                <div>没有任何模拟考试试题信息</div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default index;
