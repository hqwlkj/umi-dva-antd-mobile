# umi-dva-antd-mobile

该项目主要以 [UMI](https://umijs.org/zh/) + [DVA](https://dvajs.com/) 为底层框架，包含完整的前端工程化实践

参考了 [Ant Design pro](https://pro.ant.design/)

## 目录结构

    |-- config                                # umi 配置，包含路由，构建等配置
    |-- mock                                  # 本地模拟数据
    |-- public                                
    |   |-- favicon.png                       # favicon
    |-- src                                   # 
    |   |-- assets                            # 本地静态资源
    |   |-- components                        # 业务通用组件
    |   |-- layout                            # 通用布局
    |   |-- models                            # 全局 dva model
    |   |-- services                          # 后台接口服务
    |   |-- pages                             # 业务页面入口和常用模板
    |   |-- e2e                               # 集成测试用例
    |   |-- global.less                       # 全局样式
    |   |-- global.js                         # 全局 JS
    |   |-- theme.js                          
    |-- tests                                 # 测试工具
    |-- .gitignore                            # git忽略文件
    |-- .editorconfig                         # 编辑器代码风格配置
    |-- .eslintignore                         # eslint忽略文件
    |-- .eslintrc                             # eslint规则
    |-- .prettierignore                       # 代码风格配置忽略文件
    |-- .prettierrc                           # 代码风格配置文件
    |-- .stylelintrc                          # 样式风格配置文件
    |-- package.json                          
    |-- README.md                              

## 快速开始

```javascript

// 安装项目
git clone --depth=1 https://github.com/hqwlkj/umi-dva-antd-mobile.git my-project

cd my-project

// 检出依赖
yarn

// 运行
yarn start

// 打包
yarn build

```
更多命令可在[package.json](./package.json)中查看


#### 如果本项目对你有帮助，请不要吝啬你的star