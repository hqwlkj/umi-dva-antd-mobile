import { Button } from "antd";
import classNames from "classnames";
import React, { createElement } from "react";
import config from "./typeConfig";

const styles = require("./index.less");


export interface IExceptionProps {
  type?: "403" | "404" | "500";
  title?: React.ReactNode;
  desc?: React.ReactNode;
  img?: string;
  actions?: React.ReactNode;
  linkElement?: string | React.ComponentType;
  style?: React.CSSProperties;
  className?: string;
  backText?: React.ReactNode;
  redirect?: string;
}

class Exception extends React.PureComponent<IExceptionProps, any> {
  public static defaultProps = {
    backText: "back to paper",
    redirect: "/"
  };

  constructor(props: Readonly<IExceptionProps>) {
    super(props);
    this.state = {};
  }

  public render() {
    const {
      className,
      backText,
      linkElement = "a",
      type = '404',
      title,
      desc,
      img,
      actions,
      redirect = '',
      ...rest
    } = this.props;
    const pageType = type in config ? type : "404";
    const clsString = classNames(styles.exception, className);
    const createElementProps: {
      key: string,
      to: string;
      href: string
    } = {
      key: "back-btn",
      to: redirect,
      href: redirect
    };
    return (
      <div className={clsString} {...rest}>
        <div className={styles.imgBlock}>
          <div
            className={styles.imgEle}
            style={{ backgroundImage: `url(${img || config[pageType].img})` }}
          />
        </div>
        <div className={styles.content}>
          <h1>{title || config[pageType].title}</h1>
          <div className={styles.desc}>{desc || config[pageType].desc}</div>
          <div className={styles.actions}>
            {actions ||
            createElement(
              linkElement,
              createElementProps,
              <Button type="primary">{backText}</Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Exception;
