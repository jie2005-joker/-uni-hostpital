# uni-hospital

一个基于 **uni-app** + **Vue 3** + **TypeScript** 的多端医疗问诊平台应用。

## 📱 项目简介

本项目是一个跨平台的医疗健康应用，使用 uni-app 框架开发，支持编译到多个平台：

- **H5** - 网页版
- **小程序** - 微信小程序、支付宝小程序、百度小程序等
- **App** - iOS 和 Android 客户端

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.4.21 | 渐进式 JavaScript 框架 |
| TypeScript | 4.9.4 | JavaScript 的超集 |
| uni-app | 3.0.0 | 跨平台应用开发框架 |
| Pinia | 2.1.7 | Vue 3 状态管理库 |
| Vue I18n | 9.1.9 | 国际化插件 |
| uni-ui | 1.5.12 | uni-app 官方 UI 组件库 |
| Vite | 5.2.8 | 前端构建工具 |
| Sass | 1.100.0 | CSS 预处理器 |

## 📁 项目结构

```
uni-hospital/
├── src/
│   ├── api/              # API 接口管理
│   ├── common/           # 公共资源、常量
│   ├── components/       # 自定义组件
│   ├── pages/            # 页面文件
│   │   ├── index/        # 首页
│   │   ├── order/        # 订单页面
│   │   └── my/           # 个人中心
│   ├── subPages/         # 分包页面
│   │   ├── search/       # 搜索页
│   │   ├── hospital/     # 问诊咨询
│   │   ├── service/      # 服务页
│   │   ├── clients/      # 客户页
│   │   └── orderDetail/  # 订单详情
│   ├── static/           # 静态资源
│   ├── stores/           # Pinia 状态管理
│   ├── types/            # TypeScript 类型定义
│   ├── utils/            # 工具函数
│   ├── App.vue           # 应用入口组件
│   ├── main.ts           # 应用入口文件
│   ├── manifest.json     # 应用配置
│   └── pages.json        # 页面路由配置
├── package.json          # 项目依赖配置
├── tsconfig.json         # TypeScript 配置
├── vite.config.ts        # Vite 配置
└── index.html            # H5 入口 HTML
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- HBuilderX (可选，用于真机调试和打包)

### 安装依赖

```bash
npm install
```

### 开发调试

```bash
# H5 开发
npm run dev:h5

# 微信小程序开发
npm run dev:mp-weixin

# 支付宝小程序开发
npm run dev:mp-alipay

# 自定义平台开发
npm run dev:custom
```

### 生产构建

```bash
# H5 构建
npm run build:h5

# 微信小程序构建
npm run build:mp-weixin

# 支付宝小程序构建
npm run build:mp-alipay

# 自定义平台构建
npm run build:custom
```

### 类型检查

```bash
npm run type-check
```

## 📦 支持的平台

| 平台 | 命令 |
|------|------|
| H5 | `npm run dev:h5` |
| 微信小程序 | `npm run dev:mp-weixin` |
| 支付宝小程序 | `npm run dev:mp-alipay` |
| 百度小程序 | `npm run dev:mp-baidu` |
| 快手小程序 | `npm run dev:mp-kuaishou` |
| QQ 小程序 | `npm run dev:mp-qq` |
| 头条小程序 | `npm run dev:mp-toutiao` |
| 飞书小程序 | `npm run dev:mp-lark` |
| 京东小程序 | `npm run dev:mp-jd` |
| 小红书小程序 | `npm run dev:mp-xhs` |
| HarmonyOS | `npm run dev:mp-harmony` |

## 🎯 功能模块

- ✅ **首页** - 医疗服务展示、科室导航、医生推荐
- ✅ **问诊咨询** - 在线问诊、图文咨询、视频问诊
- ✅ **订单管理** - 问诊订单、处方订单、订单详情
- ✅ **个人中心** - 用户健康档案、就诊人管理
- ✅ **搜索功能** - 医生搜索、科室搜索、药品搜索
- ✅ **客户服务** - 在线客服、帮助中心

## 📝 开发规范

### 代码风格

- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 Composition API 编码规范
- 组件采用 `.vue` 单文件组件格式

### 目录命名

- 文件夹和文件统一使用小写 + 短横线命名（kebab-case）
- 组件文件名与组件名保持一致

### 样式规范

- 使用 SCSS 预处理器
- 全局样式写在 `src/uni.scss`
- 页面级样式写在 `src/app.css`

## 🔗 相关资源

- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [uni-ui 组件库](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html)

## 📄 许可证

MIT License

## 👥 作者

- GitHub: [@jie2005-joker](https://github.com/jie2005-joker)

---

**注意**: 本项目为 uni-app 标准模板项目，部分功能模块可能需要根据实际业务需求进行开发和补充。
