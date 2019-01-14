# umi-dva-antd-mobile

该项目主要以 [UMI](https://umijs.org/zh/) + [DVA](https://dvajs.com/) 为底层框架，以[Ant Design Mobile](https://mobile.ant.design/)为 UI 组件库，包含完整的前端工程化实践。

部分代码及功能参考于 [Ant Design pro](https://pro.ant.design/)

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
$ git clone --depth=1 https://github.com/hqwlkj/umi-dva-antd-mobile.git my-project

$ cd my-project

// 安装依赖
$ yarn or npm install

// 运行
$ yarn start or npm run start # 访问 http://localhost:8080

// 打包
$ yarn build or npm run build

```
更多命令可在[package.json](./package.json)中查看


## DEMO

<div style="display: flex;justify-content: row; align-items: center;">
  
  <div style="flex:1">
  
   ![](https://github.com/hqwlkj/umi-dva-antd-mobile/blob/master/qrcode/h5.png)
   <h5 align="center">H5 应用</h5> 
  </div>
  
  <div style="flex:1">
  
  ![](https://github.com/hqwlkj/umi-dva-antd-mobile/blob/master/qrcode/tabbar.png)
  <h5 align="center">APP 应用</h5>  
  </div>
  
</div>

## 支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions


## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我一起共建 :smiley:：

- 通过 [Issue](https://github.com/hqwlkj/umi-dva-antd-mobile/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](https://github.com/hqwlkj/umi-dva-antd-mobile/pulls) 改进 Pro 的代码。


