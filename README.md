
# Intro
本项目为示例说明，来测试如何把 gulp 前端构建与 node/express 的后端模板(swig) 结合起来使用，要解决的问题是：

- 开发时， gulp serve 和 node app.js 怎么结合watch， 怎么 browser sync(livereload) 结合 nodemon 实现前后端刷新
- 部署时， useref（usemin) 如何结合后端模板 layout 中指明的assets依赖和concat/minify/rev 等

## Frontend

前端部分包括：

- sass(compass) 来做 css preprocessor
- css sprite 图片精灵如何做
- retina images 怎么做
- javascript in es6 with babel
- swig 模板引擎中的 filter, layout 等用法
- useref 标注用于 concat/minify/rev 等
- bower_components 引入外部依赖（可github管理）
- vendors 引入第三方依赖库（无法github管理）
- webpack 用做 module builder （避免html中指明js依赖）
- browser-sync 用于多屏幕测试
- sourcemap 是否需要在 dev 时候关闭等

```bash
├── vendors
├── bower_components
├── fonts
├── images
│   ├── 404.jpg
│   ├── icon
│   ├── icon-2x
│   ├── icon-2x-s84bf245851.png
│   ├── icon-s93604f3cb4.png
├── scripts
│   ├── components
│   │   └── helper.js
│   │   └── login.js
│   ├── page1.js
│   └── <module>/<page>.js
├── scss
│   ├── base
│   │   ├── _normalize.scss
│   │   ├── _standardColors.scss
│   │   └── _typography.scss
│   ├── components
│   │   └── _icons.scss
│   └── snaptube.scss
└── views
    ├── 404.html
    ├── example1.html
    ├── layouts
    │   ├── page.html
    │   └── primary.html
    │   └── video.html
    ├── pages
    │   ├── about.html
    │   ├── contact.html
    │   ├── faq.html
    ├── partials
    │   ├── s-download-btn.html
    │   ├── s-video-detail.html
    │   ├── s-video-item.html
    │   ├── footer.html
    │   ├── siteNav.html
    │   ├── social.html
    │   └── spf-hook.html
    └── video
        ├── index.html
        ├── category.html
        └── top.html
```

## Server

后端需要考虑的是：

- logger 模块与设置（bunyan)
- cache(view 层 cache, 数据层 cache 等)
- 全部的异步代码异常的捕获
- routes 的风格写法
- New Relic 性能监控
- 代码如何发布（ view 目录切换）

```bash
├── app.js
└── routers.js
├── controllers
│   ├── example1.js
│   ├── home.js
│   └── pages.js
├── helpers
├── root
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
```

