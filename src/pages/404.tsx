import React from 'react';
import Link from 'umi/link';
import Exception from '@/components/Exception';

export default () => (
  <Exception type="404" linkElement={'/'} desc="抱歉，你访问的页面不存在" backText="返回首页" />
);
