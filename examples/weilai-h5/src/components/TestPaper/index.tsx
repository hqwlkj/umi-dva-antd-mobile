import classnames from 'classnames';
import LS from 'parsec-ls';
import React from 'react';

const styles = require('./index.less');

interface IProps {
  data: {
    title: { value: number; label: string };
    options: Array<{ value: number | string; label: string; score: number }>;
  };
  callback?: () => void;
}

interface IState {
  answer: { key: number; value: string | number; score: number };
}

export default class extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      answer: { key: 0, value: '', score: 0 },
    };
  }

  public render(): React.ReactNode {
    const { data } = this.props;
    const { answer } = this.state;
    return (
      <div className={styles['test-paper-wrapper']}>
        <div className={styles['test-title']}>
          <div className={styles.number}>{data.title.value}</div>
          <div className={styles.text}>{data.title.label}</div>
        </div>
        <div className={styles['test-options']}>
          {data.options.map(option => (
            <div
              key={`option-item-${option.value}`}
              className={classnames(styles['option-item'], {
                [styles.selected]: answer.value === option.value,
              })}
              onClick={() => {
                this.handleSelectedAnswer({
                  key: data.title.value,
                  value: option.value,
                  score: option.score,
                });
              }}
            >
              <div className={styles.number}>{option.value}</div>
              <div className={styles.text}>{option.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  private handleSelectedAnswer = (answer: {
    key: number;
    value: string | number;
    score: number;
  }) => {
    const { callback } = this.props;
    let answers = LS.getObj('answers');
    if (answers === null) {
      LS.setObj('answers', [answer]);
    } else {
      const oldAnswer = answers.filter(x => x.key === answer.key)[0];
      if (oldAnswer) {
        answers = answers.map(item => {
          if (item.key === answer.key) {
            item = {
              ...answer,
            };
          }
          return item;
        });
      } else {
        answers.push(answer);
      }
      LS.setObj('answers', answers);
    }
    this.setState(
      {
        answer,
      },
      () => {
        setTimeout(() => {
          if (callback) {
            callback();
          }
        }, 1000);
      }
    );
  };
}
