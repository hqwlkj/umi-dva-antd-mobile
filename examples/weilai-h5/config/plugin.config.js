// import postcssPlugin from './postcss.config';

export default config => {
  // config.module.rule('compile').test(/\.(css)$/).use('postcss').loader(require.resolve('postcss-loader')).options(postcssPlugin);
  // 打包优化 uglifyjs-webpack-plugin 配置
  if (process.env.NODE_ENV === 'production') {
    // config.merge({
    //   plugin: {
    //     install: {
    //       plugin: require('uglifyjs-webpack-plugin'),
    //       args: [{
    //         sourceMap: false,
    //         uglifyOptions: {
    //           compress: {
    //             // 删除所有的 `console` 语句
    //             drop_console: true,
    //           },
    //           output: {
    //             // 最紧凑的输出
    //             beautify: false,
    //             // 删除所有的注释
    //             comments: false,
    //           },
    //         },
    //       }],
    //     },
    //   },
    // });
  }
};
