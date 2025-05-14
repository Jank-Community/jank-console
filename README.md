# X.Ryder
## 简介
这是一个基于vite、react、tailwindcss和shadcn的中后台ui快速开发模板。搭配[xryder-server](https://github.com/pipijoe/xryder-server)这个基于Spring Boot的后台程序,可快速构建一个中后台系统的基础代码开发框架。

演示系统地址：[X.Ryder](https://xryder.cn)  
账号：admin  
密码：admin123
## 项目目录

|-- undefined
    |-- .gitignore
    |-- .prettierignore
    |-- ads.txt
    |-- components.json
    |-- eslint.config.js
    |-- index.html
    |-- LICENSE
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js
    |-- prettier.config.mjs
    |-- README.md
    |-- tailwind.config.js
    |-- tsconfig.app.json
    |-- tsconfig.json
    |-- tsconfig.node.json
    |-- vite.config.ts
    |-- public  /// 编译图片文件
    |   |-- favicon.ico
    |   |-- vite.svg
    |-- src //目录
        |-- 403.tsx
        |-- 500.tsx
        |-- App.css
        |-- App.tsx
        |-- axiosInstance.ts
        |-- GlobalErrorHandler.tsx
        |-- i18n.js
        |-- index.css
        |-- Login.tsx
        |-- main.tsx
        |-- vite-env.d.ts
        |-- assets  //图片文件
        |   |-- agent.svg
        |   |-- empty.png
        |   |-- file.png
        |   |-- image.png
        |   |-- logo.png
        |   |-- examples
        |   |   |-- wechat_2024-12-03_100104_397.png
        |   |   |-- wechat_2024-12-03_100305_969.png
        |   |   |-- wechat_2024-12-03_100324_346.png
        |   |   |-- wechat_2024-12-03_100359_310.png
        |   |   |-- wechat_2024-12-03_100411_159.png
        |   |   |-- wechat_2024-12-03_100430_003.png
        |   |-- lottie
        |       |-- ai.json
        |-- components   //组件
        |   |-- AiAgentAvatar.tsx
        |   |-- app-sidebar.tsx
        |   |-- mode-toggle.tsx
        |   |-- nav-actions.tsx
        |   |-- nav-main.tsx
        |   |-- nav-secondary.tsx
        |   |-- nav-system.tsx
        |   |-- nav-user.tsx
        |   |-- RichEmpty.tsx
        |   |-- theme-provider.tsx
        |   |-- ThemeToggle.tsx
        |   |-- use-dialog.tsx
        |   |-- common
        |   |   |-- CodeCopyButton.tsx
        |   |   |-- Pager.tsx
        |   |   |-- TagInput.tsx
        |   |   |-- TagWithDelete.tsx
        |   |-- hooks
        |   |   |-- use-mobile.tsx
        |   |-- lib
        |   |   |-- utils.ts
        |   |-- magicui
        |   |   |-- box-reveal.tsx
        |   |   |-- department-tree-plus.tsx
        |   |   |-- department-tree.tsx
        |   |   |-- dot-pattern.tsx
        |   |-- system
        |   |   |-- DepartmentTree.tsx
        |   |   |-- LoginLogList.tsx
        |   |   |-- LoginLogToolBar.tsx
        |   |   |-- MailSendList.tsx
        |   |   |-- MailSendToolBar.tsx
        |   |   |-- OperationLogList.tsx
        |   |   |-- OperationLogToolBar.tsx
        |   |   |-- RoleList.tsx
        |   |   |-- RoleToolBar.tsx
        |   |   |-- UserBarTool.tsx
        |   |   |-- UserList.tsx
        |   |-- ui
        |       |-- accordion.tsx
        |       |-- avatar.tsx
        |       |-- badge.tsx
        |       |-- breadcrumb.tsx
        |       |-- button.tsx
        |       |-- card.tsx
        |       |-- chart.tsx
        |       |-- checkbox.tsx
        |       |-- collapsible.tsx
        |       |-- command.tsx
        |       |-- context-menu.tsx
        |       |-- dialog.tsx
        |       |-- drawer.tsx
        |       |-- dropdown-menu.tsx
        |       |-- form.tsx
        |       |-- hover-card.tsx
        |       |-- input.tsx
        |       |-- label.tsx
        |       |-- menubar.tsx
        |       |-- navigation-menu.tsx
        |       |-- pagination.tsx
        |       |-- popover.tsx
        |       |-- progress.tsx
        |       |-- scroll-area.tsx
        |       |-- select.tsx
        |       |-- separator.tsx
        |       |-- sheet.tsx
        |       |-- sidebar.tsx
        |       |-- skeleton.tsx
        |       |-- sonner.tsx
        |       |-- switch.tsx
        |       |-- table.tsx
        |       |-- tabs.tsx
        |       |-- textarea.tsx
        |       |-- toast.tsx
        |       |-- toaster.tsx
        |       |-- tooltip.tsx
        |       |-- typing-animation.tsx
        |       |-- use-toast.tsx
        |-- layouts
        |   |-- index.ts
        |   |-- main-layout.tsx
        |   |-- root-layout.tsx
        |-- lib
        |   |-- utils.ts
        |-- locales  //国际化文件
        |   |-- en.json
        |   |-- zh.json
        |-- page //页面
        |   |-- account
        |   |   |-- index.tsx
        |   |-- chat  //ai页面
        |   |   |-- index.css
        |   |   |-- index.tsx
        |   |   |-- components
        |   |       |-- MessageRender.tsx
        |   |       |-- MessageSender.tsx
        |   |-- dashboard  //数据图表
        |   |   |-- index.tsx
        |   |-- docs  //文档区域
        |   |   |-- changelog
        |   |   |   |-- index.tsx
        |   |   |-- introduction
        |   |   |   |-- index.tsx
        |   |   |-- start
        |   |   |   |-- index.tsx
        |   |   |-- tutorials
        |   |       |-- index.tsx
        |   |-- home  //首页
        |   |   |-- index.tsx
        |   |-- mailbox
        |   |   |-- index.tsx
        |   |-- monitor
        |   |   |-- index.tsx
        |   |   |-- components
        |   |   |   |-- ChartContainer.tsx
        |   |   |   |-- ChatBarChart.tsx
        |   |   |   |-- ChatLineChart.tsx
        |   |   |   |-- MySingleValueChart.tsx
        |   |   |-- uv
        |   |       |-- VisitorChart.tsx
        |   |-- personal
        |   |   |-- index.tsx
        |   |-- system
        |       |-- department
        |       |   |-- index.tsx
        |       |-- log
        |       |   |-- index.tsx
        |       |-- login
        |       |   |-- index.tsx
        |       |-- mail
        |       |   |-- index.tsx
        |       |   |-- MailSender.tsx
        |       |-- position
        |       |   |-- index.tsx
        |       |-- role
        |       |   |-- index.tsx
        |       |-- user
        |           |-- index.tsx
        |-- store  //此处放你定义的接口  自己可以新建文件
        |   |-- accountStore.tsx
        |   |-- authStore.tsx
        |   |-- errorStore.tsx
        |   |-- systemStore.tsx
        |   |-- visitorStore.tsx
        |-- utils
            |-- index.js



## 使用的组件
- 状态管理: zustand
- 路由: react-router-dom
- 样式ui: [tailwindcss](https://tailwindcss.com/docs/installation) + [shadcn/ui](https://ui.shadcn.com/)
- icon: [react-icons](https://react-icons.github.io/react-icons/) + [lucide](https://lucide.dev/icons/)
- 网络请求: axios
- 表单参数校验: zod 
- 动效: framer-motion

## 运行
```shell
npm install

npm run dev
```

## 打包
```shell
npm run build
```

### 已有功能
- [x] 登录、token刷新、多次登录失败锁定
- [x] AI对话
- [x] 用户管理
- [x] 角色管理、权限校验
- [x] 部门管理
- [x] 操作日志
- [x] 登录日志
- [x] 账户管理、头像修改、密码重置等
- [x] 职位管理
- [x] 通知公告
- [x] 403和500 page
- [x] 400异常处理
- [x] 自定义设置（国际化、深色模式）
- [x] 智能监控

## 参与开发
1. 创建一个本地分支
    ```git
   git checkout -b my-new-branch
    ```
2. 提交你的修改
    ```shell
    git commit -a -m 'Description of the changes'
    ```
3. 推送你的分支到远程仓库
    ```shell
    git push origin my-new-branch
    ```
4. 去到远程仓库发起合并请求

# 📬 联系方式

你可以通过这些方式跟我联系：

- Email: cutesimba@163.com

感谢你在我的互联网角落停留片刻！ 💫

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=pipijoe/xryder-web&type=Date)](https://star-history.com/#pipijoe/xryder-web&Date)