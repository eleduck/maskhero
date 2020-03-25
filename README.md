# 项目配置

1. 下载代码进入目录并切换到 develop 分支

   ```shell
   git clone git@github.com:eleduck/maskhero.git
   cd maskhero
   git checkout develop
   ```

2. 安装 NPM 包

   ```shell
   yarn install // 或 npm install
   ```

3. 设置环境变量

   ```shell
   cp .env.example .env.local
   ```

   或 @管理员 要对应环境变量文件

4. 启动项目

   ```
   yarn start // 或 npm run start
   ```

   访问 http://localhost:3000/ 即可访问网站

5. 构建生产环境版本

   ```
   yarn build // 或 npm run build
   ```

## TODO:

- [ ] 适配新的 API 格式
- [ ] 各种类别的 Form token 移动到环境变量中
- [ ] 移动端页面适配
- [ ] 更新捐款数字和援助海外城市为真实数据
- [ ] 援助图记部分更换为真实数据
- [ ] 志愿者部分更换为真实数据
- [ ] 赞助商更换为为真实数据
- [ ] BUG: 数据中其他国家字段 API 返回数据格式为“其他-澳大利亚”，无法显示在地图上
- [ ] 图片等静态资源压缩优化
- [ ] 省市级数据的区域高亮及数据显示
- [ ] 页面顶部捐助信息的分割竖线
- [ ] 援助图片单击放大效果
- [ ] 援助信息随机逻辑及数量限制
