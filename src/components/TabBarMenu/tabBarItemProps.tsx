import React from 'react';

export declare type TabIcon =
  | React.ReactElement<any>
  | {
      uri: string;
    };

export interface ITabBarItemProps {
  badge?: string | number;
  onPress?: () => void;
  selected?: boolean;
  icon?: TabIcon;
  selectedIcon?: TabIcon;
  title: string;
  dot?: boolean;
  prefixCls?: string;
  style?: React.CSSProperties;
}
