# USpot Admin


## 特性

-   基于[react](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design)，[dva](https://github.com/dvajs/dva)，[Mock](https://github.com/nuysoft/Mock) 企业级后台管理系统最佳实践
-   基于[Mock](https://github.com/nuysoft/Mock)实现脱离后端独立开发
-   基于Antd UI 设计语言，提供后台管理系统常见使用场景
-   基于[dva](https://github.com/dvajs/dva)动态加载 Model 和路由，按需加载
-   浅度响应式设计

## 注意
如果使用到roadhog，且出现接口404
-  保证`package.json`里没有`roadhog`
-  删除`node_modules`
- `npm i`
- `npm i roadhog@0.6.0-beta.3 -g`

## 更新Menu属性说明

id: 唯一id
bpid: 面包屑导航的父id
mpid: 菜单的父id,缺省时为一级菜单,为-1时在菜单中不显示
name: 显示名称
router: 匹配路由,缺省时不做跳转
icon: 在名称前显示的图标

后期与router相对应的权限关联


### 目录结构

```bash
├── /mock/           # 数据mock的接口文件
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /components/   # UI组件及UI相关方法
│ │ ├── skin.less    # 全局样式
│ │ └── vars.less    # 全局样式变量
│ ├── /routes/       # 路由组件
│ │ └── app.js       # 路由入口
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /utils/        # 工具函数
│ │ ├── config.js    # 项目常规配置
│ │ ├── menu.js      # 侧边菜单配置
│ │ ├── mock.js      # 数据拦截配置
│ │ ├── config.js    # 项目常规配置
│ │ ├── request.js   # 异步请求函数
│ │ └── theme.js     # 项目需要在js中使用到样式变量
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ └── index.html     
├── package.json     # 项目信息
└── proxy.config.js  # 数据mock配置
```

文件夹命名说明:

-   components：组件（方法）为单位以文件夹保存，文件夹名组件首字母大写（如`DataTable`），方法首字母小写（如`layer`）,文件夹内主文件与文件夹同名，多文件以`index.js`导出对象（如`./src/components/Layout`）
-   routes：页面为单位以文件夹保存，文件夹名首字母小写（特殊除外，如`UIElement`）,文件夹内主文件以`index.js`导出，多文件时可建立`components`文件夹（如`./src/routes/dashboard`），如果有子路由，依次按照路由层次建立文件夹（如`./src/routes/UIElement`）



