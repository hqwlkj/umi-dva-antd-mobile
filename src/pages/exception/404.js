import React from 'react';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Exception404 = () => (
  <Exception type="404" desc="抱歉，你访问的页面不存在" linkElement={Link} backText="返回首页" />
);

export default Exception404;
